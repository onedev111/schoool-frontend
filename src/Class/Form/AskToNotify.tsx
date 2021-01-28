import React from 'react'
import Modal from 'Shared/Modal'

type Props = {
  open: boolean
  toggle(): void
  submit(notify: boolean): void
}

export default function AskToNotify({ open, toggle, submit }: Props) {
  if (!open) return null

  return (
    <Modal onClose={toggle} size="medium" className="text-center pt-8">
      <div className="mb-2 text-xl uppercase">Notify?</div>
      <div className="text-17">
        Do you want to notify the opening of this class to your followers?
      </div>
      <hr className="text-gray-bb mt-5" />
      <div className="flex-center py-4">
        <button
          className="text-gray-45 h-7 px-7 text-lg text-red-500"
          onClick={() => {
            toggle()
            submit(false)
          }}
        >
          No
        </button>
        <button
          className="rounded-full bg-blue-primary text-white h-7 px-7 ml-3"
          onClick={() => {
            toggle()
            submit(true)
          }}
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}
