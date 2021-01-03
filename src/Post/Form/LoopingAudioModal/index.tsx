import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

export default observer(function LoopingAudioModal({ state }: Props) {
  const onClose = () => state.backToForm()

  return (
    <div className="pb-12">
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        Make Looping Audio
      </div>
    </div>
  )
})
