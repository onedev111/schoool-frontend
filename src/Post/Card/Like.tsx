import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import cn from 'classnames'
import { Post } from 'Post/types'
import { useMutation } from 'react-query'
import api from 'api'
import { observer } from 'mobx-react-lite'
import { updateCache } from 'Post/cacheActions'

type Props = {
  post: Post
  className?: string
}

export default observer(function Like({ post, className }: Props) {
  const onError = (error: Error) =>
    updateCache(post.id, { error: error.message })

  const { mutate: like, isLoading: liking } = useMutation(api.post.like, {
    onError,
  })
  const { mutate: unlike, isLoading: unliking } = useMutation(api.post.unlike, {
    onError,
  })

  const isLoading = liking || unliking

  const handleClick = async () => {
    const fn = post.liked ? unlike : like
    post.liked = !post.liked
    fn({ postId: post.id })

    const commentsCount = post.commentsCount + (post.liked ? 1 : -1)
    updateCache(post.id, { commentsCount, error: undefined })
  }

  return (
    <button
      className={cn(
        'flex-center text-gray-5f transition duration-200',
        post.liked && 'text-blue-primary',
        className,
      )}
      disabled={isLoading}
      onClick={handleClick}
    >
      <Heart size={34} />
    </button>
  )
})
