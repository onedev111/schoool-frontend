import React from 'react'
import Modal from 'Shared/Modal'
import { Post } from 'Post/types'
import { useMutation } from 'react-query'
import api from 'api'
import useToggle from 'utils/useToggle'
import Spin from 'assets/images/icons/Spin'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { removeFromCache, updateCache } from 'Post/actions'

type Props = {
  post: Post
  onClose(): void
}

export default observer(function SavePost({ post, onClose }: Props) {
  const [error, setError] = React.useState<string>()
  const [done, toggleDone] = useToggle()

  const { mutate: addToSaved } = useMutation(api.post.addToSaved, {
    onSettled(_, error) {
      if (error) {
        setError((error as Error).message)
        return
      }

      updateCache(post.id, { addedToSaved: true })
      toggleDone()
    },
  })

  const { mutate: removeFromSaved } = useMutation(api.post.removeFromSaved, {
    onSettled(_, error) {
      if (error) {
        setError((error as Error).message)
        return
      }

      updateCache(post.id, { addedToSaved: false })
      removeFromCache(post, { key: ['posts', 'saved'] })
      toggleDone()
    },
  })

  React.useEffect(() => {
    if (post.addedToSaved) {
      removeFromSaved({ postId: post.id })
    } else {
      addToSaved({ postId: post.id })
    }
  }, [])

  return (
    <Modal onClose={onClose} className="text-center">
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {!done && (
        <>
          <div className="mt-8 mb-2 text-lg">
            {post.addedToSaved ? 'Removing post...' : 'Adding post...'}
          </div>
          <div className="flex-center my-3">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        </>
      )}
      {done && (
        <>
          <div className="mt-8 mb-2 text-lg">
            {post.addedToSaved
              ? 'This post is saved'
              : 'This post is removed from saved'}
          </div>
          {post.addedToSaved && (
            <div className="text-gray-02 mb-5 px-10">
              Go to your “Me” page to view all saved posts.
            </div>
          )}
        </>
      )}
      <hr className="text-gray-bb" />
      <div className="flex-center">
        <button
          className={cn(
            'rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold',
            !done && 'opacity-25',
          )}
          onClick={onClose}
          disabled={!done}
        >
          Okay
        </button>
      </div>
    </Modal>
  )
})
