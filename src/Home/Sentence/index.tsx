import React from 'react'
import { Sentence as SentenceType } from 'Home/Post/types'
import cn from 'classnames'
import { X } from '@styled-icons/boxicons-regular/X'

type Props = {
  setSentence(sentence: SentenceType | null): void
  toggleSentenceModal(): void
  className?: string
}

export default function Sentence({
  setSentence,
  toggleSentenceModal,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'border border-gray-3b font-bold text-gray-3b h-11 rounded-full px-6 flex items-center',
        className,
      )}
    >
      <div className="flex-grow">Notebook Sentence</div>
      <button type="button" onClick={toggleSentenceModal} className="px-4">
        Edit
      </button>
      <button type="button" onClick={() => setSentence(null)} className="ml-4">
        <X size={32} />
      </button>
    </div>
  )
}
