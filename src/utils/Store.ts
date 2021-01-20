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

type Store<ItemType> = {
  items: ItemType[]
  canFetchMore: boolean
  isFetching: boolean
  error?: Error
  setCanFetchMore(value: boolean): void
  setIsFetching(value: boolean): void
  setError(error?: Error): void
  setItems(items: ItemType[]): void
  push(...items: ItemType[]): void
  unshift(...items: ItemType[]): void
  removeBy(params: Partial<ItemType>): void
  update(item: ItemType, params: Partial<ItemType>): ItemType
  remove(removing: ItemType): void
  reset(): void
  fetch(params?: { reset?: boolean }): Promise<void>
}

export function makeStore<ItemType, Props>(
  params: Params<ItemType>,
  props?: Props,
) {
  const base: Store<ItemType> = {
    items: [],
    canFetchMore: true,
    isFetching: false,
    setCanFetchMore(value) {
      this.canFetchMore = value
    },
    setIsFetching(value) {
      this.isFetching = value
    },
    setError(error) {
      this.error = error
    },
    setItems(items) {
      this.items = items
    },
    push(...items) {
      this.items.push(...items)
    },
    unshift(...items) {
      this.items.unshift(...items)
    },
    removeBy(params) {
      this.items = this.items.filter((item) => {
        for (const key in params) {
          if (item[key] !== params[key]) return true
        }
        return false
      })
    },
    update(item, params) {
      Object.assign(item, params)
      return item
    },
    remove(removing) {
      this.items = this.items.filter((item) => item !== removing)
    },
    reset() {
      this.items = []
      this.error = undefined
      this.canFetchMore = true
      this.isFetching = false
    },
    async fetch({ reset } = {}) {
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
  }

  // if props provided, combine props and base into one object with all getters
  let object: Store<ItemType> & Props
  if (props) {
    object = props as Store<ItemType> & Props
    Object.getOwnPropertyNames(base).forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(base, key)
      if (desc) Object.defineProperty(object, key, desc)
    })
  } else {
    object = base as Store<ItemType> & Props
  }

  const store = makeAutoObservable(object)
  return store
}

// hack to get return type of generic function
class Helper<T, P> {
  Return = makeStore<T, P>({
    async fetchList() {
      return []
    },
  })
}

type MakeStoreReturnType<T, P> = Helper<T, P>['Return']

export const useRecords = <ItemType, Props>({
  store,
  loadOnScroll,
}: {
  store: MakeStoreReturnType<ItemType, Props>
  loadOnScroll?: {
    ref: { current: HTMLElement | null }
    threshold: number
    direction?: 'vertical' | 'horizontal'
  }
}) => {
  React.useEffect(() => {
    if (store.canFetchMore && store.items.length === 0) store.fetch()
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
