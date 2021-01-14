import { makeStore, useRecords } from 'utils/Store'
import api from 'api'

export const NotebookStore = makeStore({
  fetchList: api.notebook.list,
  limit: 30,
})

export const useSentences = ({
  ref,
}: {
  ref: { current: HTMLElement | null }
}) =>
  useRecords({
    store: NotebookStore,
    loadOnScroll: {
      ref,
      threshold: 300,
    },
  })
