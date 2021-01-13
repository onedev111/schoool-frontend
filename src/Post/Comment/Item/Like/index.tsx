import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import { Post } from 'Post/types'
import { Comment } from 'Post/Comment/types'
import { useMutation } from 'react-query'
import api from 'api'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

type Props = {
  post: Post
  comment: Comment
}

export default observer(function CommentLike({ post, comment }: Props) {
  const [like, { isLoading: liking }] = useMutation(api.comment.like)
  const [unlike, { isLoading: unliking }] = useMutation(api.comment.unlike)

  const isLoading = liking || unliking

  const handleClick = async () => {
    const fn = comment.liked ? unlike : like
    try {
      await fn({ postOwnerId: post.user.id, commentId: comment.id })
      comment.liked = !comment.liked
      comment.likesCount += comment.liked ? 1 : -1
      comment.error = undefined
    } catch (err) {
      comment.error = err
    }
  }

  return (
    <>
      <button
        className={cn(
          'relative px-2 py-1',
          comment.liked && 'text-blue-primary',
        )}
        style={{ top: '-2px' }}
        disabled={isLoading}
        onClick={handleClick}
      >
        <Heart size={14} />
      </button>
      <div className="font-bold">Liked {comment.likesCount}</div>
    </>
  )
})
