import React from 'react'
import { useInfiniteQuery } from 'react-query'

export default function useRecords<T>({
  key,
  load,
  loadOnScroll,
  limit = 20,
  options = {},
}: {
  key: unknown[]
  load: (params: { limit: number; offset: number }) => Promise<T>
  loadOnScroll?: {
    ref: { current: HTMLElement | null }
    threshold: number
    direction?: 'vertical' | 'horizontal'
  }
  limit?: number
  options?: { enabled?: boolean }
}) {
  const result = useInfiniteQuery(
    key,
    ({ pageParam = 0 }) => {
      return load({
        limit,
        offset: pageParam,
      })
    },
    {
      getNextPageParam: (lastPage, pages) =>
        (Array.isArray(lastPage) ? lastPage.length > 0 : lastPage)
          ? pages.reduce(
              (sum, page) => sum + (Array.isArray(page) ? page.length : 1),
              0,
            )
          : undefined,
      ...options,
    },
  )

  const { isFetching, fetchNextPage, hasNextPage } = result

  React.useEffect(() => {
    if (!loadOnScroll) return

    const wrap = loadOnScroll.ref.current
    if (!wrap) return

    const isWrapScrolling = ['auto', 'scroll'].includes(
      getComputedStyle(wrap).overflow,
    )

    const scrollListener = () => {
      if (!hasNextPage || isFetching) return

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

      if (value < loadOnScroll.threshold) fetchNextPage()
    }

    const scrolling = isWrapScrolling ? wrap : window
    scrolling.addEventListener('scroll', scrollListener)
    return () => scrolling.removeEventListener('scroll', scrollListener)
  }, [loadOnScroll, isFetching, fetchNextPage, hasNextPage])

  return result
}
