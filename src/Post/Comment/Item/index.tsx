import React from 'react'
import { Comment } from 'Post/Comment/types'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import Attachments from 'Post/Attachments'
import Comments from 'Post/Comment/List'
import dayjs from 'dayjs'
import CommentStore from 'Post/Comment/Store'
import CommentLike from 'Post/Comment/Item/Like'
import { Post } from 'Post/types'

type Props = {
  post: Post
  allComments: Comment[]
  comment: Comment
  level: number
  scrollingElementRef?: { current: HTMLDivElement | null }
}

export default function CommentItem({
  post,
  allComments,
  comment,
  level,
  scrollingElementRef,
}: Props) {
  const { id } = comment
  const subComments = allComments.filter(
    (comment) => comment.parentCommentId === id,
  )

  const commentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (CommentStore.highlightedComment === comment && commentRef.current) {
      scrollingElementRef?.current?.scrollTo({
        top: commentRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <>
      <hr className="text-gray-dc" style={{ marginLeft: `${80 * level}px` }} />
      <div className="pt-6 pb-3" ref={commentRef}>
        <div className="flex items-center mb-2 px-8">
          <img
            src={comment.user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 font-bold">{comment.user.name}</div>
        </div>
        <div className="pl-20 pr-12">
          <div className="text-lg text-gray-6b mb-2">{comment.text}</div>
          <Attachments
            audioClass="mt-1 mb-4"
            linkClass="mt-1 mb-4"
            imageClass="w-full mt-1 mb-4"
            videoClass="mt-1 mb-4"
            attachments={{
              audio: comment.audio,
              loopingAudio: comment.loopingAudio,
              images: [comment.image].filter((url) => url) as string[],
              video: comment.video,
            }}
          />
          <div className="flex items-center justify-between">
            <div className="text-gray-97">
              {dayjs(comment.date).format('MMM DD, YYYY')}
            </div>
            <div className="text-gray-6e flex items-center text-xs">
              <CommentLike post={post} comment={comment} />
              <button className="ml-4 font-bold">Reply</button>
            </div>
          </div>
        </div>
      </div>
      {subComments.length > 0 && (
        <>
          <hr
            className="text-gray-dc"
            style={{ marginLeft: `${80 * level}px` }}
          />
          <div className="-mt-px">
            <Comments
              post={post}
              allComments={allComments}
              levelComments={subComments}
              level={level + 1}
              scrollingElementRef={scrollingElementRef}
            />
          </div>
        </>
      )}
    </>
  )
}
