import { makeStore, useRecords } from 'utils/Store'
import api from 'api'

export const NotebookStore = makeStore(
  {
    fetchList: api.notebook.list,
    limit: 30,
  },
  {
    totalValue: undefined as number | undefined,
    get loadedTotal() {
      return this.totalValue !== undefined
    },
    get total() {
      if (!this.totalValue) this.fetchTotal()
      return this.totalValue || 0
    },
    setTotal(total?: number) {
      this.totalValue = total
    },
    async fetchTotal() {
      const { notebookCount } = await api.app.getCountsAndIsPremium()
      this.setTotal(notebookCount)
    },
  },
)

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
