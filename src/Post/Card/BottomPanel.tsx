import React from 'react'
import { Post } from 'Post/types'
import Like from 'Post/Card/Like'
import { Comment } from '@styled-icons/fa-solid/Comment'
import cn from 'classnames'
import Notebook from 'assets/images/icons/notebook'
import useToggle from 'utils/useToggle'
import { Check } from '@styled-icons/boxicons-regular/Check'
import SavePostModal from 'Post/Card/Menu/SavePostModal'
import { observer } from 'mobx-react-lite'

type Props = {
  post: Post
  toggleComments(): void
  toggleAddToNotebook(): void
}

export default observer(function PostBottomPanel({
  post,
  toggleComments,
  toggleAddToNotebook,
}: Props) {
  const [savePostOpen, toggleSavePost] = useToggle()

  return (
    <>
      {savePostOpen && <SavePostModal post={post} onClose={toggleSavePost} />}
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
        <button
          className={cn(
            'w-1/4 text-center transition duration-200',
            post.addedToSaved ? 'text-blue-primary' : 'text-gray-5f',
          )}
          onClick={toggleSavePost}
        >
          <Check size={40} />
        </button>
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
})
