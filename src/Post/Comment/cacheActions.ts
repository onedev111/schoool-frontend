import { updatePages } from 'utils/queryClient'
import { Comment } from 'Post/Comment/types'

export const addToCache = (comment: Comment) => {
  updatePages<Comment[][]>(['comments'], (pages) =>
    pages.map((page, i) => (i === 0 ? [...page, comment] : page)),
  )
}
