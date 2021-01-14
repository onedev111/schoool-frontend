import React from 'react'
import { makeAutoObservable } from 'mobx'

type Params<ItemType> =
  | {
      fetchList: (params: {
        limit: number
        offset: number
      }) => Promise<ItemType[]>
      limit: number
    }
  | {
      fetchList: () => Promise<ItemType[]>
    }

export function makeStore<ItemType>(params: Params<ItemType>) {
  const store = makeAutoObservable({
    items: [] as ItemType[],
    canFetchMore: true,
    isFetching: false,
    error: undefined as Error | undefined,
    setCanFetchMore(value: boolean) {
      this.canFetchMore = value
    },
    setIsFetching(value: boolean) {
      this.isFetching = value
    },
    setError(error?: Error) {
      this.error = error
    },
    setItems(items: ItemType[]) {
      this.items = items
    },
    push(...items: ItemType[]) {
      this.items.push(...items)
    },
    unshift(...items: ItemType[]) {
      this.items.unshift(...items)
    },
    removeBy(params: Partial<ItemType>) {
      this.items = this.items.filter((item) => {
        for (const key in params) {
          if (item[key] !== params[key]) return true
        }
        return false
      })
    },
    async fetch() {
      if (!store.canFetchMore || store.isFetching) return
      store.setIsFetching(true)

      try {
        let items: ItemType[]
        if ('limit' in params) {
          items = await params.fetchList({
            limit: params.limit,
            offset: this.items.length,
          })
        } else {
          items = await params.fetchList()
        }

        if (items.length === 0) store.setCanFetchMore(false)
        else store.push(...items)

        store.setError()
      } catch (error) {
        store.setError(error)
      }

      store.setIsFetching(false)
    },
  })

  return store
}

// hack to get return type of generic function
class Helper<T> {
  Return = makeStore<T>({
    async fetchList() {
      return []
    },
  })
}

type MakeStoreReturnType<T> = Helper<T>['Return']

export const useRecords = <ItemType>({
  store,
  loadOnScroll,
}: {
  store: MakeStoreReturnType<ItemType>
  loadOnScroll?: {
    ref: { current: HTMLElement | null }
    threshold: number
  }
}) => {
  React.useEffect(() => {
    store.fetch()
  }, [])

  React.useEffect(() => {
    if (!loadOnScroll) return

    const wrap = loadOnScroll.ref.current
    if (!wrap) return

    const scrollListener = () => {
      if (
        store.canFetchMore &&
        !store.isFetching &&
        wrap.scrollHeight - wrap.scrollTop - wrap.offsetHeight <
          loadOnScroll.threshold
      )
        store.fetch()
    }

    wrap.addEventListener('scroll', scrollListener)
    return () => wrap.removeEventListener('scroll', scrollListener)
  }, [loadOnScroll])

  return {
    isFetching: store.isFetching,
    items: store.items,
  }
}
