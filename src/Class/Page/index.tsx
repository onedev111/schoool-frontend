import React from 'react'
import { useParams } from 'react-router-dom'
import ClassLayout from 'Class/Layout'
import logo from 'assets/images/logo.svg'
import { Link } from 'react-router-dom'
import Posts from 'Class/Posts'
import { useMutation, useQuery } from 'react-query'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import routes from 'routes'
import Alert from 'Shared/Modal/Alert'
import useToggle from 'utils/useToggle'
import Loader from 'Shared/Loader'

export default function ClassPage() {
  const { id: stringId } = useParams<{ id: string }>()
  const id = parseInt(stringId)

  const { data: item, isLoading } = useQuery(['class', id], () =>
    api.classes.getClass({ id }),
  )

  const [getUser, { data: user }] = useMutation(api.user.getUser)

  React.useEffect(() => {
    if (item) {
      getUser({ id: item.owner.id })
    }
  }, [item])

  const [join, { isLoading: isLoadingJoin }] = useMutation(api.classes.join)

  const [openLockedAlert, toggleLockedAlert] = useToggle()

  return (
    <ClassLayout>
      {openLockedAlert && (
        <Alert
          title="This class doesn’t accept new members"
          titleClass="text-xl font-bold py-10"
          onClose={toggleLockedAlert}
        />
      )}
      <div className="bg-white shadow mb-5 pt-16 px-16 pb-10">
        {isLoading && (
          <div className="flex-center my-5">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isLoading && item && (
          <>
            <div className="flex-center mb-4">
              <Link to={routes.user(item.owner.id)}>
                <img
                  src={user ? user.avatar : logo}
                  alt="logo"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </Link>
              <img
                className="mx-10 rounded-full flex-shrink-0 block"
                src={item.image}
                alt="class photo"
                style={{
                  width: '240px',
                  height: '240px',
                }}
              />
              <div style={{ width: '100px' }}>
                <div className="border border-black rounded-full flex-center h-6 text-sm text-black w-full">
                  {item.isPublic ? 'Public' : 'Private'}
                </div>
                {item.isLocked && (
                  <div className="border border-red-50 text-red-50 rounded-full flex-center h-6 text-sm w-full mt-2">
                    Join Blocked
                  </div>
                )}
              </div>
            </div>
            <div
              className="text-3xl font-bold text-black flex-center"
              style={{ height: '38px' }}
            >
              {item.name}
            </div>
            <Link
              to={routes.user(item.owner.id)}
              className="text-blue-primary text-lg flex-center h-6 mb-4 hover:underline"
            >
              Created by {item.owner.name}
            </Link>
            <div className="text-black text-lg mb-4">{item.description}</div>
            <div className="flex">
              <button
                type="button"
                className="w-1/2 bg-blue-primary rounded-full h-10 flex-center text-white text-lg"
              >
                Classmates
              </button>
              <button
                type="button"
                className="w-1/2 bg-white border border-blue-primary text-blue-primary text-lg font-bold flex-center ml-5 rounded-full"
                disabled={isLoadingJoin}
                onClick={() => {
                  if (!item) return

                  if (item.isLocked) {
                    toggleLockedAlert()
                  } else {
                    join({ classId: item.id })
                  }
                }}
              >
                {isLoadingJoin && <Loader className="w-5 h-5" />}
                {!isLoadingJoin && (
                  <>
                    {!item.isLocked && 'Join'}
                    {item.isLocked && 'Join Blocked'}
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <Posts />
    </ClassLayout>
  )
}
