import React from 'react'
import Modal from 'Shared/Modal'

type Props = {
  onClose(): void
}

export default function SavePost({ onClose }: Props) {
  return (
    <Modal onClose={onClose} className="text-center">
      <div className="mt-8 mb-2 text-lg">This post is saved</div>
      <div className="text-gray-02 mb-5 px-10">
        Go to your “Me” page to view all saved posts.
      </div>
      <hr className="text-gray-bb" />
      <div className="flex-center">
        <button
          className="rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold"
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </Modal>
  )
}
