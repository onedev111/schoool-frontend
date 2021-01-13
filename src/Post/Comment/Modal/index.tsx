import React from 'react'
import { Post } from 'Post/types'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import CommentForm from 'Post/Comment/Form'
import CommentsList from 'Post/Comment/List'
import Spin from 'assets/images/icons/Spin'
import { getCurrentUser } from 'User/currentUser'
import useComments from 'Post/Comment/useComments'
import { observer } from 'mobx-react-lite'

type Props = {
  post: Post
  onClose(): void
}

export default observer(function CommentsModal({ post, onClose }: Props) {
  const { comments, isFetching } = useComments({ postId: post.id })
  const { avatar, name } = getCurrentUser()
  const scrollingElementRef = React.useRef<HTMLDivElement>(null)

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
      {comments && (
        <CommentsList
          post={post}
          allComments={comments}
          levelComments={comments.filter((comment) => !comment.parentCommentId)}
          scrollingElementRef={scrollingElementRef}
        />
      )}
      {isFetching && post.commentsCount > 0 && (
        <div className="flex-center mb-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
    </Modal>
  )
})
