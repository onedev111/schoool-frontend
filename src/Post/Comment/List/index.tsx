import React from 'react'
import { Comment } from 'Post/Comment/types'
import CommentItem from 'Post/Comment/Item'
import { Post } from 'Post/types'

type Props = {
  post: Post
  allComments: Comment[]
  levelComments: Comment[]
  level?: number
  scrollingElementRef?: { current: HTMLDivElement | null }
}

export default function CommentsList({
  post,
  allComments,
  levelComments,
  level = 0,
  scrollingElementRef,
}: Props) {
  return (
    <>
      {levelComments.map((comment, i) => (
        <CommentItem
          key={i}
          post={post}
          allComments={allComments}
          comment={comment}
          level={level}
          scrollingElementRef={scrollingElementRef}
        />
      ))}
    </>
  )
}
