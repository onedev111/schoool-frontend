import { makeStore, useRecords } from 'utils/Store'
import api from 'api'

export const RecommendedClassesStore = makeStore({
  fetchList: api.classes.listRecommended,
  limit: 20,
})

export const useData = ({
  ref,
  direction,
  threshold,
}: {
  ref: { current: HTMLElement | null }
  direction: 'vertical' | 'horizontal'
  threshold: number
}) =>
  useRecords({
    store: RecommendedClassesStore,
    loadOnScroll: { ref, threshold, direction },
  })
