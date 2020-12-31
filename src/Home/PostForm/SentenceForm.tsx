import React from 'react'
import { Sentence as SentenceType } from 'Home/Post/types'
import SentenceSharedForm from 'Home/Sentence/Form'

type Props = {
  sentence: SentenceType | null
  setSentence(sentence: SentenceType): void
  onClose(): void
}

export default function SentenceForm({
  sentence,
  setSentence,
  onClose,
}: Props) {
  return (
    <SentenceSharedForm
      sentence={sentence}
      titleClass="text-2xl uppercase text-center pt-8 pb-6"
      contentClass="pt-6 px-8 pb-12"
      buttonWrapClass="flex-center mt-12"
      title={
        sentence ? 'Edit Notebook SentenceForm' : 'Add Notebook SentenceForm'
      }
      buttonText={sentence ? 'Save SentenceForm' : 'Add SentenceForm'}
      onClose={onClose}
      onSubmit={setSentence}
      backButton={true}
    />
  )
}
