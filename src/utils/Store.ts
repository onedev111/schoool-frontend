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
    update(item: ItemType, params: Partial<ItemType>) {
      Object.assign(item, params)
      return item
    },
    remove(removing: ItemType) {
      this.items = this.items.filter((item) => item !== removing)
    },
    reset() {
      this.items = []
      this.error = undefined
      this.canFetchMore = true
      this.isFetching = false
    },
    async fetch({ reset }: { reset?: boolean } = {}) {
      if ((!reset && !store.canFetchMore) || store.isFetching) return
      store.setIsFetching(true)

      try {
        let items: ItemType[]
        if ('limit' in params) {
          items = await params.fetchList({
            limit: params.limit,
            offset: reset ? 0 : this.items.length,
          })
        } else {
          items = await params.fetchList()
        }

        if (items.length === 0) store.setCanFetchMore(false)
        else if (reset) store.setItems(items)
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
    direction?: 'vertical' | 'horizontal'
  }
}) => {
  React.useEffect(() => {
    store.fetch()
  }, [])

  React.useEffect(() => {
    if (!loadOnScroll) return

    const wrap = loadOnScroll.ref.current
    if (!wrap) return

    const isWrapScrolling = ['auto', 'scroll'].includes(
      getComputedStyle(wrap).overflow,
    )

    const scrollListener = () => {
      if (!store.canFetchMore || store.isFetching) return

      let value: number
      if (loadOnScroll.direction === 'horizontal') {
        if (isWrapScrolling)
          value = wrap.scrollWidth - wrap.scrollLeft - wrap.offsetWidth
        else
          value =
            wrap.getBoundingClientRect().right -
            Math.max(
              document.body.offsetWidth,
              document.documentElement.offsetWidth,
            )
      } else {
        if (isWrapScrolling)
          value = wrap.scrollHeight - wrap.scrollTop - wrap.offsetHeight
        else
          value =
            wrap.getBoundingClientRect().bottom -
            Math.max(
              document.body.offsetHeight,
              document.documentElement.offsetHeight,
            )
      }

      if (value < loadOnScroll.threshold) store.fetch()
    }

    const scrolling = isWrapScrolling ? wrap : window
    scrolling.addEventListener('scroll', scrollListener)
    return () => scrolling.removeEventListener('scroll', scrollListener)
  }, [loadOnScroll])

  return {
    isFetching: store.isFetching,
    items: store.items,
  }
}
