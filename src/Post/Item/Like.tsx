import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import cn from 'classnames'
import { Post } from 'Post/types'
import { useMutation } from 'react-query'
import api from 'api'
import { observer } from 'mobx-react-lite'

type Props = {
  post: Post
  className?: string
}

export default observer(function Index({ post, className }: Props) {
  const { mutate: like, isLoading: liking } = useMutation(api.post.like)
  const { mutate: unlike, isLoading: unliking } = useMutation(api.post.unlike)

  const isLoading = liking || unliking

  const handleClick = async () => {
    try {
      const fn = post.liked ? unlike : like
      post.liked = !post.liked
      await fn({ postId: post.id })
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
})
