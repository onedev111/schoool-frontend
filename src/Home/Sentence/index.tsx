import React from 'react'
import cn from 'classnames'
import { X } from '@styled-icons/boxicons-regular/X'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
  className?: string
}

export default observer(function Sentence({ state, className }: Props) {
  return (
    <div
      className={cn(
        'border border-gray-3b font-bold text-gray-3b h-11 rounded-full px-6 flex items-center',
        className,
      )}
    >
      <div className="flex-grow">Notebook Sentence</div>
      <button
        type="button"
        onClick={() => state.setCurrentScreen('sentence')}
        className="px-4"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => state.setSentence(null)}
        className="ml-4"
      >
        <X size={32} />
      </button>
    </div>
  )
})
