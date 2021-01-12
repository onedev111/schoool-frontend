import React from 'react'
import SentenceSharedForm from 'Home/Sentence/Form'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

export default observer(function SentenceForm({ state }: Props) {
  const { notebookSentence } = state.values

  return (
    <SentenceSharedForm
      sentence={notebookSentence}
      titleClass="text-2xl uppercase text-center pt-8 pb-6"
      contentClass="pt-6 px-8 pb-12"
      buttonWrapClass="flex-center mt-12"
      title={
        notebookSentence ? 'Edit Notebook Sentence' : 'Add Notebook Sentence'
      }
      buttonText={notebookSentence ? 'Save Sentence' : 'Add Sentence'}
      onClose={() => state.backToForm()}
      onSubmit={(sentence) => state.setSentence(sentence)}
      backButton={true}
    />
  )
})
