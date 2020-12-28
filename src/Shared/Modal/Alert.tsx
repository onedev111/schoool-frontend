import React from 'react'
import Modal, { sizes } from 'Shared/Modal'

type Props = {
  title: string
  text?: string
  size: keyof typeof sizes
  onClose(): void
}

export default function Alert({ title, text, size, onClose }: Props) {
  return (
    <Modal onClose={onClose} size={size} className="text-center">
      <div className="mt-8 mb-2 text-lg">{title}</div>
      {text && (
        <div className="font-bold text-gray-02 mb-2 px-10">
          This post is only for class members. If you want to see this post
          more, please join this class.
        </div>
      )}
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
