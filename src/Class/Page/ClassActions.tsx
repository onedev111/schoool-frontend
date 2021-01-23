import React from 'react'
import { useMutation } from 'react-query'
import api from 'api'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'
import { Class } from 'Class/types'
import { resetClasses, updateClassCache } from 'Class/actions'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'
import Spin from 'assets/images/icons/Spin'
import Modal from 'Shared/Modal'
import ClassMates from 'Class/Page/ClassMates'

type Props = {
  item: Class
}

export default function ClassActions({ item }: Props) {
  const [openLockedAlert, toggleLockedAlert] = useToggle()
  const [openRequestSent, toggleRequestSent] = useToggle()
  const [openCancelJoin, toggleCancelJoin] = useToggle()
  const [openMembers, toggleMembers] = useToggle()
  const [error, setError] = React.useState<string>()

  const { mutate: join, isLoading: isJoining } = useMutation(api.classes.join, {
    onSettled(_, error) {
      if (error) {
        setError((error as Error).message)
      } else {
        toggleRequestSent()
        resetClasses()
        updateClassCache(item.id, { isApplied: true })
      }
    },
  })

  const { mutate: cancelJoin, isLoading: isCancelingJoin } = useMutation(
    api.classes.cancelJoin,
    {
      onSettled() {
        resetClasses()
        updateClassCache(item.id, { isApplied: false })
      },
    },
  )

  const isLoadingJoin = isJoining || isCancelingJoin

  return (
    <>
      {openMembers && <ClassMates item={item} onClose={toggleMembers} />}
      {openRequestSent && (
        <Alert
          size="small"
          title="Your request has been sent."
          onClose={toggleRequestSent}
        />
      )}
      {error && (
        <Alert size="small" title={error} onClose={() => setError(undefined)} />
      )}
      {openCancelJoin && (
        <Modal onClose={toggleCancelJoin} size="small" className="text-center">
          <div className="mt-8 mb-2 text-lg">Cancel Request?</div>
          <hr className="text-gray-bb" />
          <div className="flex-center">
            <button
              className="rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold"
              onClick={toggleCancelJoin}
            >
              No
            </button>
            <button
              className="rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold ml-5"
              onClick={() => {
                cancelJoin({ classId: item.id })
                toggleCancelJoin()
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
      {openLockedAlert && (
        <Alert
          title="This class doesn’t accept new members"
          titleClass="text-xl font-bold py-10"
          onClose={toggleLockedAlert}
        />
      )}
      <div className="flex pb-10 px-16">
        <button
          type="button"
          className="w-1/2 bg-blue-primary rounded-full h-10 flex-center text-white text-lg"
          onClick={toggleMembers}
        >
          Classmates
        </button>
        <button
          type="button"
          className="w-1/2 bg-white border border-blue-primary text-blue-primary text-lg font-bold flex-center ml-5 rounded-full"
          disabled={isLoadingJoin}
          onClick={() => {
            if (item.isLocked) {
              toggleLockedAlert()
            } else if (item.isApplied) {
              toggleCancelJoin()
            } else {
              join({ classId: item.id })
            }
          }}
        >
          {isLoadingJoin && (
            <Spin className="w-5 h-5 text-blue-primary animate-spin" />
          )}
          {!isLoadingJoin && (
            <>
              {!item.isLocked && !item.isApplied && 'Join'}
              {!item.isLocked && item.isApplied && (
                <>
                  Requested
                  <CaretDown size={24} className="ml-1 text-blue-primary" />
                </>
              )}
              {item.isLocked && 'Join Blocked'}
            </>
          )}
        </button>
      </div>
    </>
  )
}
