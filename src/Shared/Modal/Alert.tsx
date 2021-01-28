import React from 'react'
import Modal, { sizes } from 'Shared/Modal'

type Props = {
  title: string
  text?: string
  size?: keyof typeof sizes
  titleClass?: string
  onClose(): void
}

export default function Alert({
  title,
  titleClass,
  text,
  size,
  onClose,
}: Props) {
  return (
    <Modal onClose={onClose} size={size} className="text-center">
      <div
        className={
          titleClass || (text ? 'mt-6 mb-2 text-xl' : 'mt-8 mb-6 text-lg')
        }
      >
        {title}
      </div>
      {text && (
        <div className="font-bold text-gray-02 text-17 mb-6 px-5">{text}</div>
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
