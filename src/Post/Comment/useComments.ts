import React from 'react'
import CommentStore from 'Post/Comment/Store'

type Props = {
  postId: number
}

export default function useComments({ postId }: Props) {
  React.useEffect(() => {
    CommentStore.fetch({ postId })
    return () => CommentStore.resetComments()
  }, [])

  return {
    comments: CommentStore.comments,
    isFetching: CommentStore.isFetching,
  }
}
