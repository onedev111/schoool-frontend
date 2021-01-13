import React from 'react'
import PostStore from 'Post/Store'

type Props = {
  ref: { current: HTMLDivElement | null }
}

const loadNextThreshold = 500

export default function usePosts({ ref }: Props) {
  React.useEffect(() => {
    PostStore.fetch()
  }, [])

  React.useEffect(() => {
    const scrollListener = () => {
      const postsWrap = ref.current
      if (!postsWrap) return

      if (
        PostStore.canFetchMore &&
        !PostStore.isFetching &&
        postsWrap.getBoundingClientRect().bottom - document.body.offsetHeight <
          loadNextThreshold
      )
        PostStore.fetch()
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return { isFetching: PostStore.isFetching, posts: PostStore.posts }
}
