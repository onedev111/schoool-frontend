import React from 'react'
import { Class } from 'Class/types'
import Modal from 'Shared/Modal'
import { useMutation, useQuery } from 'react-query'
import api from 'api'
import { Link } from 'react-router-dom'
import routes from 'routes'
import Spin from 'assets/images/icons/Spin'
import Loader from 'Shared/Loader'
import { queryClient } from 'utils/queryClient'
import { getCurrentUserId } from 'User/currentUser'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'

type Props = {
  item: Class
  onClose(): void
}

export default function ClassMates({ item, onClose }: Props) {
  const applicantsKey = ['class', item.id, 'applicants']
  const { data: applicants, isLoading: isApplicantsLoading } = useQuery(
    applicantsKey,
    () => api.classes.applicants({ classId: item.id }),
    {
      enabled: item.isOwn,
    },
  )

  const membersKey = ['class', item.id, 'members']
  const { data: members } = useQuery(membersKey, () =>
    api.classes.members({ classId: item.id }),
  )

  const { mutate: approveJoinRequest, isLoading: isApproving } = useMutation(
    api.classes.approveJoinRequest,
    {
      onSettled() {
        queryClient.invalidateQueries(applicantsKey, { exact: true })
        queryClient.invalidateQueries(membersKey, { exact: true })
      },
    },
  )

  const {
    mutateAsync: rejectJoinRequest,
    isLoading: isRejecting,
  } = useMutation(api.classes.rejectJoinRequest)

  const { mutateAsync: removeMember, isLoading: isDismissing } = useMutation(
    api.classes.removeMember,
  )

  const [rejectId, setReject] = React.useState<number | undefined>()
  const [dismissId, setDismiss] = React.useState<number | undefined>()

  const currentUserId = getCurrentUserId()

  return (
    <>
      {(rejectId || dismissId) && (
        <Modal
          onClose={() =>
            rejectId ? setReject(undefined) : setDismiss(undefined)
          }
          className="text-center"
        >
          <div className="mt-11 mb-8 text-lg text-xl text-black font-bold">
            {rejectId && 'Are you sure to reject join-request?'}
            {dismissId && 'Are you sure to reject dismiss this member?'}
          </div>
          <hr className="text-gray-bb" />
          <div className="flex-center my-4">
            <button
              className="text-gray-4f h-7 font-bold w-24"
              onClick={() =>
                rejectId ? setReject(undefined) : setDismiss(undefined)
              }
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-red-58 text-white h-7 font-bold ml-3 flex-center w-24"
              disabled={isRejecting || isDismissing}
              onClick={async () => {
                if (rejectId) {
                  await rejectJoinRequest({
                    classId: item.id,
                    userId: rejectId,
                  })
                  setReject(undefined)
                  queryClient.invalidateQueries(applicantsKey, { exact: true })
                } else if (dismissId) {
                  await removeMember({ classId: item.id, userId: dismissId })
                  setDismiss(undefined)
                  queryClient.invalidateQueries(membersKey, { exact: true })
                }
              }}
            >
              {!isRejecting && rejectId && 'Reject'}
              {!isDismissing && dismissId && 'Dismiss'}
              {(isRejecting || isDismissing) && <Loader className="w-5 h-5" />}
            </button>
          </div>
        </Modal>
      )}
      {!rejectId && !dismissId && (
        <Modal onClose={onClose}>
          <div className="text-2xl uppercase text-center pt-8 pb-6 relative flex-shrink-0">
            <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
              <button type="button" onClick={onClose}>
                <ArrowLeft size={26} />
              </button>
            </div>
            Classmates
          </div>
          {item.isOwn && (
            <div className="mb-5">
              <div className="text-gray-6b uppercase mb-2 px-5">
                Respond to join request
              </div>
              {applicants && applicants.length === 0 && (
                <div className="px-5">No pending join requests</div>
              )}
              {applicants && (
                <div className="flex min-h-0">
                  <div className="flex-1 overflow-auto pb-5">
                    {applicants.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center py-2 px-5"
                      >
                        <Link to={routes.user(user.id)}>
                          <div
                            className="rounded-full mr-2 bg-center bg-cover"
                            style={{
                              width: '45px',
                              height: '45px',
                              backgroundImage: `url("${user.avatar}")`,
                            }}
                          />
                        </Link>
                        <Link
                          to={routes.user(user.id)}
                          className="text-bold text-black text-lg"
                        >
                          {user.name}
                        </Link>
                        <div className="flex-grow flex items-center justify-end">
                          <button
                            type="button"
                            className="text-blue-06 font-bold flex-center"
                            disabled={isApproving}
                            onClick={() =>
                              approveJoinRequest({
                                classId: item.id,
                                userId: user.id,
                              })
                            }
                          >
                            {isApproving && (
                              <Spin className="w-5 h-5 mr-2 text-blue-primary animate-spin" />
                            )}
                            Approve
                          </button>
                          <button
                            type="button"
                            className="text-red-500 ml-4 font-bold"
                            onClick={() => setReject(user.id)}
                            disabled={isApproving}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isApplicantsLoading && (
                <div className="flex-center my-5">
                  <Spin className="w-10 h-10 text-blue-primary animate-spin" />
                </div>
              )}
            </div>
          )}
          <div className="text-gray-6b uppercase px-5">Members:</div>
          {members && !members.some(({ id }) => id !== currentUserId) && (
            <div className="px-5">No members in this class yet</div>
          )}
          {members && members.length > 0 && (
            <div className="flex min-h-0 mt-2">
              <div className="flex-1 overflow-auto pb-5">
                {members.map((user) => (
                  <React.Fragment key={user.id}>
                    {user.id !== currentUserId && (
                      <div
                        key={user.id}
                        className="flex items-center py-2 px-5"
                      >
                        <Link to={routes.user(user.id)}>
                          <div
                            className="rounded-full mr-2 bg-center bg-cover"
                            style={{
                              width: '45px',
                              height: '45px',
                              backgroundImage: `url("${user.avatar}")`,
                            }}
                          />
                        </Link>
                        <Link
                          to={routes.user(user.id)}
                          className="text-bold text-black text-lg"
                        >
                          {user.name}
                        </Link>
                        {item.isOwn && (
                          <div className="flex-grow flex items-center justify-end">
                            <button
                              type="button"
                              className="text-red-500 ml-4 font-bold"
                              onClick={() => setDismiss(user.id)}
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          {!members && (
            <div className="flex-center my-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
        </Modal>
      )}
    </>
  )
}
