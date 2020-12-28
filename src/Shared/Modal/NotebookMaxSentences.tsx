import React from 'react'
import Modal from 'Shared/Modal/index'

type Props = {
  onClose(): void
}

export default function NotebookMaxSentences({ onClose }: Props) {
  return (
    <Modal onClose={onClose} size="small" className="text-center">
      <div className="text-xl uppercase pt-6 pb-4">Save to my notebook</div>
      <hr className="text-gray-bb" />
      <div className="pt-6 px-6 pb-8">
        <div className="text-lg font-bold mb-3">
          You’ve reached the maximum number of sentences to be kept in Notebook.
        </div>
        <div className="px-1 mb-4">
          If you want to keep more than 100 sentences in Notebook, please open
          the SCHOOOL app and subscribe{' '}
          <span className="text-red-57">Premium Features</span>.
        </div>
        <button
          className="rounded-full bg-blue-primary text-white h-7 px-7 font-bold"
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </Modal>
  )
}
