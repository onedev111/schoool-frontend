import React from 'react'
import Modal from 'Shared/Modal'
import Loader from 'Shared/Loader'
import useToggle from 'utils/useToggle'

type Props = {
  onClose(): void
  onDelete(): void
}

export default function Delete({ onClose, onDelete }: Props) {
  const [isLoading, toggleLoading] = useToggle()

  return (
    <Modal onClose={onClose} className="text-center">
      <div className="mt-8 mb-2 text-lg uppercase text-xl">
        Are you sure to <span className="text-red-57">delete</span>?
      </div>
      <div className="mb-5">This cannot be undone.</div>
      <hr className="text-gray-bb" />
      <div className="flex-center my-4">
        <button className="text-gray-4f h-7 font-bold w-24" onClick={onClose}>
          Cancel
        </button>
        <button
          className="rounded-full bg-red-58 text-white h-7 font-bold ml-3 flex-center w-24"
          disabled={isLoading}
          onClick={async () => {
            toggleLoading()
            await onDelete()
            toggleLoading()
            onClose()
          }}
        >
          {!isLoading && 'Delete'}
          {isLoading && <Loader className="w-5 h-5" />}
        </button>
      </div>
    </Modal>
  )
}
