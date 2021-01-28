import React from 'react'
import Modal from 'Shared/Modal'
import SentenceForm from 'Home/Sentence/Form'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'
import { useQuery } from 'react-query'
import api from 'api'
import { NotebookSentence } from 'Post/types'

type Props = {
  onClose(): void
  backButton?: boolean
  title: string
  buttonText: string
  sentence?: NotebookSentence | null
  className?: string
  titleClass?: string
  contentClass: string
  buttonWrapClass: string
}

export default function AddSentence({
  onClose,
  backButton,
  title,
  buttonText,
  sentence,
  className,
  titleClass,
  contentClass,
  buttonWrapClass,
}: Props) {
  const { data: countsAndIsPremium, isLoading: isLoadingTotal } = useQuery(
    ['countsAndIsPremium'],
    api.app.getCountsAndIsPremium,
  )
  const total = countsAndIsPremium?.notebookCount || 0
  const isPremium = countsAndIsPremium?.isPremium || false
  const reachedMaximum = !isPremium && total >= 100

  return (
    <>
      {!isLoadingTotal && reachedMaximum && (
        <NotebookMaxSentences onClose={onClose} />
      )}
      {!isLoadingTotal && !reachedMaximum && (
        <Modal onClose={onClose} size="small">
          <SentenceForm
            onClose={onClose}
            backButton={backButton}
            title={title}
            titleClass={titleClass}
            buttonText={buttonText}
            sentence={sentence}
            className={className}
            contentClass={contentClass}
            buttonWrapClass={buttonWrapClass}
          />
        </Modal>
      )}
    </>
  )
}
