import React from 'react'
import { Post } from 'Post/types'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import CommentForm from 'Post/Comment/Form'
import CommentsList from 'Post/Comment/List'
import Spin from 'assets/images/icons/Spin'
import { getCurrentUser } from 'User/currentUser'
import { observer } from 'mobx-react-lite'
import useRecords from 'utils/useRecords'
import api from 'api'

type Props = {
  post: Post
  onClose(): void
  highlightedCommentId?: number
  setHighlightedCommentId(id?: number): void
}

export default observer(function CommentsModal({
  post,
  onClose,
  highlightedCommentId,
  setHighlightedCommentId,
}: Props) {
  const scrollingElementRef = React.useRef<HTMLDivElement>(null)

  const { isFetching, data } = useRecords({
    key: ['comments'],
    load: () => api.comment.list({ postId: post.id }),
  })

  const { avatar, name } = getCurrentUser()

  return (
    <Modal
      onClose={onClose}
      size="large"
      scrollingElementRef={scrollingElementRef}
    >
      <div className="mt-8 mb-7 uppercase text-center text-2xl relative">
        <button onClick={onClose}>
          <X size={32} className="absolute top-0 right-0 mr-7 text-gray-5f" />
        </button>
        Comments
      </div>
      <div
        className="m-8 border border-gray-c5 pt-5 px-5 pb-4 shadow-md"
        style={{ borderRadius: '10px' }}
      >
        <div className="flex items-center">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-2 font-bold text-sm">{name}</div>
        </div>
        <CommentForm
          post={post}
          className="pt-4 flex items-end"
          minHeight={90}
        />
      </div>
      {data &&
        data.pages.map((page, i) => (
          <CommentsList
            key={i}
            post={post}
            allComments={page}
            levelComments={page.filter((comment) => !comment.parentCommentId)}
            scrollingElementRef={scrollingElementRef}
            highlightedCommentId={highlightedCommentId}
            setHighlightedCommentId={setHighlightedCommentId}
          />
        ))}
      {isFetching && post.commentsCount > 0 && (
        <div className="flex-center mb-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
    </Modal>
  )
})
