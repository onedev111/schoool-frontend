import React from 'react'
import Loader from 'Shared/Loader'
import { useMutation } from 'react-query'
import api from 'api'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'
import { Class } from 'Class/types'

type Props = {
  item: Class
}

export default function ClassActions({ item }: Props) {
  const [join, { isLoading: isLoadingJoin }] = useMutation(api.classes.join, {
    onSettled(data, error) {
      if (!error) {
        console.log('joined')
      }
    },
  })

  const [openLockedAlert, toggleLockedAlert] = useToggle()
  return (
    <>
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
  )
}
