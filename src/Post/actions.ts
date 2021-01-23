import { Post } from 'Post/types'
import { updatePages } from 'utils/queryClient'

export const updateCache = (id: number, post: Partial<Post>) => {
  updatePages<Post[][]>(['posts'], (pages) =>
    pages.map((page) =>
      page.map((item) => (item.id === id ? { ...item, ...post } : item)),
    ),
  )
}

export const addToCache = (post: Post) => {
  updatePages<Post[][]>(['posts'], (pages) =>
    pages.map((page, i) => (i === 0 ? [post, ...page] : page)),
  )
}

export const removeFromCache = (post: Post, { key = ['posts'] } = {}) => {
  updatePages<Post[][]>(key, (pages) =>
    pages.map((page) => page.filter((item) => item.id !== post.id)),
  )
}
