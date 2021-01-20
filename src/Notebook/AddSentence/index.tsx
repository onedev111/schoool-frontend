import React from 'react'
import Modal from 'Shared/Modal'
import SentenceForm from 'Home/Sentence/Form'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'

type Props = {
  onClose(): void
}

export default function AddSentence({ onClose }: Props) {
  const reachedMaximum = false

  return (
    <>
      {reachedMaximum && <NotebookMaxSentences onClose={onClose} />}
      {!reachedMaximum && (
        <Modal onClose={onClose} size="small">
          <SentenceForm
            onClose={onClose}
            title="Add Expressions"
            buttonText="Add"
            contentClass="pt-4 px-5 pb-6"
            buttonWrapClass="flex-center mt-5"
          />
        </Modal>
      )}
    </>
  )
}
