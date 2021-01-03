import React from 'react'
import { Comment as CommentType } from 'Post/types'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import Comments from 'Post/CommentsModal/Comments/index'
import Attachments from 'Post/Attachments'
import dayjs from 'dayjs'

type Props = {
  comment: CommentType
  level: number
}

export default function Comment({ comment, level }: Props) {
  return (
    <>
      <hr className="text-gray-dc" style={{ marginLeft: `${80 * level}px` }} />
      <div className="pt-6 pb-3">
        <div className="flex items-center mb-2 px-8">
          <img
            src={comment.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2 font-bold">{comment.name}</div>
        </div>
        <div className="pl-20 pr-12">
          <div className="text-lg text-gray-6b mb-2">{comment.comment}</div>
          <Attachments
            audioClass="mt-1 mb-4"
            previewsClass="mt-1 mb-4"
            imageClass="w-full mt-1 mb-4"
            videoClass="mt-1 mb-4"
            attachments={comment}
          />
          <div className="flex items-center justify-between">
            <div className="text-gray-97">
              {dayjs(comment.date).format('MMM DD, YYYY')}
            </div>
            <div className="text-gray-6e flex items-center text-xs">
              <button className="relative" style={{ top: '-2px' }}>
                <Heart size={14} />
              </button>
              <div className="ml-2 font-bold">Liked {comment.liked}</div>
              <button className="ml-4 font-bold">Reply</button>
            </div>
          </div>
        </div>
      </div>
      {(comment.comments as CommentType[])?.length > 0 && (
        <>
          <hr
            className="text-gray-dc"
            style={{ marginLeft: `${80 * level}px` }}
          />
          <div className="-mt-px">
            <Comments
              comments={comment.comments as CommentType[]}
              level={level + 1}
            />
          </div>
        </>
      )}
    </>
  )
}
