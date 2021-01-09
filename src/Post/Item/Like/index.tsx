import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import useToggle from 'utils/useToggle'
import cn from 'classnames'
import { Post } from 'Post/types'

type Props = {
  post: Post
}

export default function Index({ post }: Props) {
  const [liked, toggle] = useToggle(post.liked)

  return (
    <button
      className={cn(
        'w-1/4 flex-center text-gray-5f transition duration-200',
        liked && 'text-blue-primary',
      )}
      onClick={toggle}
    >
      <Heart size={34} />
    </button>
  )
}
