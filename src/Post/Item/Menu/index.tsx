import React from 'react'
import Dropdown from 'Shared/Dropdown'
import useToggle from 'utils/useToggle'
import { Post } from 'Post/types'
import style from './style.module.css'
import PostForm from 'Post/Form'
import DeleteModal from 'Shared/Modal/Delete'
import api from 'api'
import SavePostModal from 'Post/Item/Menu/SavePostModal'
import { observer } from 'mobx-react-lite'
import Spin from 'assets/images/icons/Spin'
import { useMutation } from 'react-query'
import { removeFromCache, updateCache } from 'Post/cacheActions'

const itemClass = `w-full flex-center transition duration-200 hover:bg-gray-f2 cursor-pointer ${style.menuItem}`

type Props = {
  post: Post
  button: (params: { onClick(): void }) => React.ReactNode
  className?: string
}

export default observer(function Menu({ post, button, className }: Props) {
  const [isOpen, setOpen] = React.useState(false)
  const [showPostForm, togglePostForm] = useToggle()
  const [showDeleteModal, toggleDeleteModal] = useToggle()
  const [showShare, toggleShare] = useToggle()
  const [savePostOpen, toggleSavePost] = useToggle()
  const { isMine, isClassOwner, isClassAdmin } = post
  const [error, setError] = React.useState<string>()

  const { mutate: follow, isLoading: followLoading } = useMutation(
    api.user.follow,
    {
      onSettled(_, error) {
        if (error) {
          setError((error as Error).message)
        } else {
          setError(undefined)
          updateCache(post.id, { isFollowing: true })
        }
      },
    },
  )

  const { mutate: unfollow, isLoading: unfollowLoading } = useMutation(
    api.user.unfollow,
    {
      onSettled(_, error) {
        if (error) {
          setError((error as Error).message)
        } else {
          setError(undefined)
          updateCache(post.id, { isFollowing: false })
        }
      },
    },
  )

  const isFollowLoading = followLoading || unfollowLoading

  const close = () => setOpen(false)

  const toggleFollow = () => {
    if (isFollowLoading) return

    const fn = post.isFollowing ? unfollow : follow
    fn({
      user: { ...post.user, isFollowing: post.isFollowing },
    })
  }

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
            removeFromCache(post)
          }}
        />
      )}
      {savePostOpen && (
        <SavePostModal
          post={post}
          onClose={() => {
            toggleSavePost()
            close()
          }}
        />
      )}
      <Dropdown
        isOpen={isOpen}
        setOpen={setOpen}
        button={button}
        className={className}
        contentClass="absolute mt-2 rounded-lg shadow-around bg-white right-0 z-20 text-17 font-bold"
      >
        {error && <div className="text-red-500 py-2">{error}</div>}
        {!isMine && (
          <button type="button" className={`${itemClass}`}>
            Send Message
          </button>
        )}
        {!isMine && (
          <button
            type="button"
            className={`${itemClass} text-blue-deep flex`}
            disabled={isFollowLoading}
            onClick={toggleFollow}
          >
            {isFollowLoading && (
              <div className="w-0 h-full flex-center relative">
                <Spin className="w-5 h-5 text-blue-primary animate-spin absolute right-0 mr-2" />
              </div>
            )}
            {post.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
        <button
          type="button"
          onClick={toggleSavePost}
          className={`${itemClass} text-blue-deep`}
        >
          {post.addedToSaved ? 'Remove from Saved' : 'Save Post'}
        </button>

        {!isMine && (
          <button
            type="button"
            className={`${itemClass}`}
            onClick={toggleShare}
          >
            Share This Post
          </button>
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
        {(isMine || isClassOwner || isClassAdmin) && (
          <button
            type="button"
            className={`${itemClass} text-red-500`}
            onClick={toggleDeleteModal}
          >
            Delete
          </button>
        )}
        {isMine && (
          <button
            type="button"
            className={`${itemClass}`}
            onClick={toggleShare}
          >
            Share This Post
          </button>
        )}
      </Dropdown>
    </>
  )
})
