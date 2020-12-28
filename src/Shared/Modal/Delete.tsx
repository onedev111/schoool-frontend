import React from 'react'
import Modal from 'Shared/Modal'

type Props = {
  onClose(): void
}

export default function Delete({ onClose }: Props) {
  return (
    <Modal onClose={onClose} className="text-center">
      <div className="mt-8 mb-2 text-lg uppercase text-xl">
        Are you sure to <span className="text-red-57">delete</span>?
      </div>
      <div className="mb-5">This cannot be undone.</div>
      <hr className="text-gray-bb" />
      <div className="flex-center my-4">
        <button className="text-gray-4f h-7 px-7 font-bold" onClick={onClose}>
          Cancel
        </button>
        <button
          className="rounded-full bg-red-57 text-white h-7 px-7 font-bold ml-3"
          onClick={onClose}
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
