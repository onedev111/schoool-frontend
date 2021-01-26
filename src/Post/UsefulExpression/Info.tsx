import React from 'react'
import Modal from '../../Shared/Modal'
import Volume from 'assets/images/icons/volume'
import Notebook from 'assets/images/icons/notebook'
import { Equalizer } from '@styled-icons/remix-fill/Equalizer'

type Props = {
  onClose(): void
}

export default function Info({ onClose }: Props) {
  return (
    <Modal
      onClose={onClose}
      className="py-8 px-10 flex-col flex-center"
      width={false}
    >
      <div className="text-2xl font-bold text-center mb-6">Icons</div>
      <div className="pr-5">
        <div className="flex items-center mb-5">
          <div className="w-10 flex-center mr-3">
            <Notebook className="text-blue-primary w-8" />
          </div>
          <div>
            <b>Send</b> expressions to <b>Notebook</b>
          </div>
        </div>
        <div className="flex items-center mb-5">
          <div className="w-10 flex-center mr-3">
            <Volume className="text-blue-primary" size={28} />
          </div>
          <div>
            <b>Read</b> sentences <b>aloud</b> 3 times
          </div>
        </div>
        <div className="flex items-center mb-5">
          <div className="w-10 flex-center mr-3">
            <Equalizer className="text-blue-primary" size={24} />
          </div>
          <div>
            <b>Change</b> level of difficulty
          </div>
        </div>
        <div className="mt-6">
          <b>Click</b> sentence to see the translation
        </div>
        <div className="mt-2">
          <b>Double Click</b> to make it read out loud
        </div>
      </div>
      <button
        type="button"
        className="rounded px-5 h-8 flex-center bg-blue-primary text-white font-bold mt-5"
        onClick={onClose}
      >
        Okay
      </button>
    </Modal>
  )
}
