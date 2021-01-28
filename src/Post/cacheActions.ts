import { Post, UsefulExpression } from 'Post/types'
import { updatePages } from 'utils/queryClient'

type PostsPage = {
  posts: Post[]
  usefulExpressions: UsefulExpression[]
}

export const updateCache = (id: number, post: Partial<Post>) => {
  updatePages<PostsPage[]>(['posts'], (pages) =>
    pages.map((page) => {
      return {
        posts: page.posts.map((item) =>
          item.id === id ? { ...item, ...post } : item,
        ),
        usefulExpressions: page.usefulExpressions,
      }
    }),
  )
}

export const addToCache = (post: Post) => {
  updatePages<PostsPage[]>(['posts'], (pages) =>
    pages.map((page, i) =>
      i === 0
        ? {
            posts: [post, ...page.posts],
            usefulExpressions: page.usefulExpressions,
          }
        : page,
    ),
  )
}

export const removeFromCache = (post: Post, { key = ['posts'] } = {}) => {
  updatePages<PostsPage[]>(key, (pages) =>
    pages.map((page) => ({
      posts: page.posts.filter((item) => item.id !== post.id),
      usefulExpressions: page.usefulExpressions,
    })),
  )
}
