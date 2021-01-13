import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import cn from 'classnames'
import { Post } from 'Post/types'
import { useMutation } from 'react-query'
import api from 'api'

type Props = {
  post: Post
  className?: string
}

export default function Index({ post, className }: Props) {
  const [like, { isLoading: liking }] = useMutation(api.post.like)
  const [unlike, { isLoading: unliking }] = useMutation(api.post.unlike)

  const isLoading = liking || unliking

  const handleClick = async () => {
    try {
      const fn = post.liked ? unlike : like
      await fn({ postId: post.id })
      post.liked = !post.liked
      post.error = undefined
    } catch (err) {
      post.error = err
    }
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
}
