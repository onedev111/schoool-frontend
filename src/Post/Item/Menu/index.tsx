import React from 'react'
import Dropdown from 'Shared/Dropdown'
import useToggle from 'utils/useToggle'
import { Post } from 'Post/types'
import style from './style.module.css'
import PostForm from 'Post/Form'
import DeleteModal from 'Shared/Modal/Delete'
import api from 'api'
import { PostStore } from 'Post/Store'

const itemClass = `w-full flex-center transition duration-200 hover:bg-gray-f2 cursor-pointer ${style.menuItem}`

type Props = {
  post: Post
  button: (params: { onClick(): void }) => React.ReactNode
  className?: string
}

export default function Menu({ post, button, className }: Props) {
  const { isMine } = post
  const [showPostForm, togglePostForm] = useToggle()
  const [showDeleteModal, toggleDeleteModal] = useToggle()
  const [showShare, toggleShare] = useToggle()

  return (
    <>
      {showPostForm && <PostForm post={post} onClose={togglePostForm} />}
      {showShare && (
        <PostForm post={{ sharedPost: post }} onClose={toggleShare} />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={toggleDeleteModal}
          onDelete={() => {
            api.post.remove({ id: post.id })
            PostStore.remove(post)
            PostStore.fetch({ reset: true })
          }}
        />
      )}
      <Dropdown
        button={button}
        className={className}
        contentClass="absolute mt-2 rounded-lg shadow-around bg-white right-0 z-20 text-17 font-bold"
      >
        {!isMine && <div className={`${itemClass}`}>Send Message</div>}
        {!isMine && <div className={`${itemClass} text-blue-deep`}>Follow</div>}

        {/*{savePostOpen && <SavePostModal onClose={toggleSavePost} />}*/}
        {/*<div onClick={toggleSavePost} className={`${itemClass} text-blue-deep`}>*/}
        {/*  Save Post*/}
        {/*</div>*/}

        {!isMine && (
          <div className={`${itemClass}`} onClick={toggleShare}>
            Share This Post
          </div>
        )}
        {!isMine && <div className={`${itemClass} text-blue-deep`}>Report</div>}
        {isMine && (
          <button
            type="button"
            className={`${itemClass} text-blue-deep`}
            onClick={togglePostForm}
          >
            Edit
          </button>
        )}
        <div
          className={`${itemClass} text-red-500`}
          onClick={toggleDeleteModal}
        >
          Delete
        </div>
        {isMine && (
          <div className={`${itemClass}`} onClick={toggleShare}>
            Share This Post
          </div>
        )}
      </Dropdown>
    </>
  )
}
