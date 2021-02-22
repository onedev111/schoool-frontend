import React from 'react'
import { Post as PostType } from 'Post/types'
import cn from 'classnames'
import CardContent from 'Post/Card/CardContent'

type Props = {
  post: PostType
  className?: string
  highlightedCommentId?: number
  highlightText?: string
}

export default function Post({
  post,
  className,
  highlightedCommentId,
  highlightText,
}: Props) {
  return (
    <div
      className={cn(
        'bg-white shadow relative flex flex-col',
        className || 'mb-5',
      )}
    >
      <CardContent
        post={post}
        highlightedCommentId={highlightedCommentId}
        highlightText={highlightText}
      />
    </div>
  )
}
