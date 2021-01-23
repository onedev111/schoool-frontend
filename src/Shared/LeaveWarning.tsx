import React from 'react'
import Modal from 'Shared/Modal'

type Props = {
  cancel(): void
  close(): void
}

export default function LeaveWarning({ cancel, close }: Props) {
  return (
    <Modal onClose={cancel} size="medium" className="text-center pt-8">
      <div className="mb-2 text-xl uppercase">Leave page?</div>
      <div className="text-17">Are you sure to leave page?</div>
      <hr className="text-gray-bb mt-5" />
      <div className="flex-center py-4">
        <button className="text-gray-45 h-7 px-7 text-xl" onClick={cancel}>
          Cancel
        </button>
        <button
          className="rounded-full bg-blue-primary text-white h-7 px-7 ml-3"
          onClick={close}
        >
          Leave
        </button>
      </div>
    </Modal>
  )
}
