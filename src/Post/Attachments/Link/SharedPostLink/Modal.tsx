import React from 'react'
import Modal from 'Shared/Modal'
import Spin from 'assets/images/icons/Spin'
import { useQuery } from 'react-query'
import api from 'api'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import Post from 'Post/Card'

type Props = {
  postId: number
  onClose(): void
}

export default function PostModal({ postId, onClose }: Props) {
  const { data: post, isLoading } = useQuery(['post', postId], () =>
    api.post.findById({ id: postId }),
  )

  return (
    <Modal onClose={onClose} width={672}>
      <div className="border-b border-gray-c5 relative">
        <button
          type="button"
          className="absolute top-0 left-0 text-gray-5f mt-6 ml-4"
          onClick={onClose}
        >
          <ArrowLeft size={26} />
        </button>
        <div className="text-2xl uppercase text-center pt-5 pb-4">
          Shared Post
        </div>
      </div>

      {isLoading && (
        <div className="flex-center my-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}

      {post && (
        <div className="px-4">
          <Post post={post} />
        </div>
      )}
    </Modal>
  )
}
