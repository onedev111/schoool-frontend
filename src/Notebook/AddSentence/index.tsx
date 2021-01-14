import React from 'react'
import Modal from 'Shared/Modal'
import SentenceForm from 'Home/Sentence/Form'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'
import api from 'api'
import { NotebookStore } from 'Notebook/Store'

type Props = {
  onClose(): void
}

export default function AddSentence({ onClose }: Props) {
  const reachedMaximum = false

  const addSentence = async (values: { text: string; translation: string }) => {
    const sentence = await api.notebook.create(values)
    NotebookStore.setItems([sentence, ...NotebookStore.items])
  }

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
            onSubmit={addSentence}
          />
        </Modal>
      )}
    </>
  )
}
