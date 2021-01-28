import { updateData, updatePages } from 'utils/queryClient'
import { NotebookSentence } from 'Notebook/types'

export const addToCache = (sentence: NotebookSentence) => {
  updatePages<NotebookSentence[][]>(['notebookSentences'], (pages) =>
    pages.map((page, i) => (i === 0 ? [sentence, ...page] : page)),
  )
}

export const updateTotal = (update: (total: number) => number) => {
  updateData<{ notebookCount: number }>(['countsAndIsPremium'], (data) => ({
    ...data,
    notebookCount: update(data.notebookCount),
  }))
}

export const filterCache = (filter: (item: NotebookSentence) => boolean) =>
  updatePages<NotebookSentence[][]>(['notebookSentences'], (pages) =>
    pages.map((page) => page.filter((item) => filter(item))),
  )
