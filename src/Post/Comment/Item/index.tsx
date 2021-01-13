import React from 'react'
import { Comment } from 'Post/Comment/types'
import Attachments from 'Post/Attachments'
import Comments from 'Post/Comment/List'
import dayjs from 'dayjs'
import CommentStore from 'Post/Comment/Store'
import CommentLike from 'Post/Comment/Item/Like'
import { Post } from 'Post/types'
import useToggle from 'utils/useToggle'
import CommentForm from 'Post/Comment/Form'
import Text from 'Post/Text'

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
    const scrollingElement = scrollingElementRef?.current
    const commentElement = commentRef.current
    if (CommentStore.highlightedComment?.id !== comment.id) return
    CommentStore.setHighlightedComment()

    if (commentElement && scrollingElement) {
      scrollingElement.scrollTo({
        top:
          commentElement.offsetTop -
          scrollingElement.offsetHeight / 2 -
          commentElement.offsetHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [])

  const [showReply, toggleReply] = useToggle()

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
          <Text className="text-lg text-gray-6b mb-2" data={comment} />
          <Attachments
            audioClass="mt-1 mb-4"
            linkClass="mt-1 mb-4"
            imageClass="w-full mt-1 mb-4"
            videoClass="mt-1 mb-4"
            fileClass="mt-1 mb-4"
            attachments={{
              audio: comment.audio,
              loopingAudio: comment.loopingAudio,
              images: [comment.image].filter((url) => url) as string[],
              video: comment.video,
              file: comment.file,
            }}
          />
          <div className="flex items-center justify-between">
            <div className="text-gray-97">
              {dayjs(comment.date).format('MMM DD, YYYY')}
            </div>
            <div className="text-gray-6e flex items-center text-xs">
              <CommentLike post={post} comment={comment} />
              <button className="ml-4 font-bold" onClick={toggleReply}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReply && (
        <div
          className="shadow-lg mx-5 mb-5 border border-gray-c5"
          style={{ borderRadius: '10px' }}
        >
          <CommentForm
            comment={{
              parentCommentId: comment.parentCommentId,
              inReplyTo: comment,
            }}
            post={post}
            className="pt-6 pb-3 pl-5 pr-8 flex-center"
            minHeight={36}
            autoFocus
            onSuccess={toggleReply}
          />
        </div>
      )}
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
