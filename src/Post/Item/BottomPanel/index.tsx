import React from 'react'
import { Post } from 'Post/types'
import Like from 'Post/Item/Like'
import { Comment } from '@styled-icons/fa-solid/Comment'
import cn from 'classnames'
import Notebook from 'assets/images/icons/notebook'
import useToggle from 'utils/useToggle'
import Modal from 'Shared/Modal'
import SentenceForm from 'Home/Sentence/Form'
import { useMutation } from 'react-query'
import api from 'api'

type Props = {
  post: Post
  toggleComments(): void
}

export default function PostBottomPanel({ post, toggleComments }: Props) {
  const [openAddToNotebook, toggleAddToNotebook] = useToggle()
  const [createSentence] = useMutation(api.notebook.create)

  return (
    <>
      {openAddToNotebook && (
        <Modal onClose={toggleAddToNotebook} size="small">
          <SentenceForm
            onClose={toggleAddToNotebook}
            onSubmit={createSentence}
            title="Send to my notebook"
            buttonText="Add"
            contentClass="pt-4 px-5 pb-6"
            buttonWrapClass="flex-center mt-5"
            sentence={{
              text: post.text,
              translation: '',
            }}
          />
        </Modal>
      )}
      <div
        style={{ height: '90px' }}
        className="border-b border-gray-d6 flex justify-around px-8"
      >
        <Like className="w-1/3" post={post} />
        <button className="w-1/3 flex-center text-gray-5f transition duration-200">
          <Comment size={29} onClick={toggleComments} />
          {post.commentsCount > 0 && (
            <div className="text-lg ml-3">{post.commentsCount}</div>
          )}
        </button>
        {/*<button*/}
        {/*  className={cn(*/}
        {/*    'w-1/4 text-center transition duration-200',*/}
        {/*    post.saved ? 'text-blue-primary' : 'text-gray-5f',*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <Check size={40} />*/}
        {/*</button>*/}
        <button
          type="button"
          className="w-1/3 flex-center"
          onClick={toggleAddToNotebook}
        >
          <Notebook
            className={cn(
              'transition duration-200',
              post.notebookSentence ? 'text-blue-primary' : 'text-gray-5f',
            )}
          />
        </button>
      </div>
    </>
  )
}
