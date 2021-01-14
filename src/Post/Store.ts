import { makeStore, useRecords } from 'utils/Store'
import api from 'api'

export const PostStore = makeStore({
  fetchList: api.post.list,
  limit: 5,
})

export const useData = ({
  ref,
  threshold,
}: {
  ref: { current: HTMLElement | null }
  threshold: number
}) =>
  useRecords({
    store: PostStore,
    loadOnScroll: { ref, threshold },
  })
