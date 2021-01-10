import React from 'react'
import Post from 'Post/Item'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import Notebook from './Notebook'
import { useQuery } from 'react-query'
import api from 'api'
import UploadingPostsStore from 'Post/UploadingPostsStore'
import { observer } from 'mobx-react-lite'
import Spin from 'assets/images/icons/Spin'
import useToggle from 'utils/useToggle'
import PostForm from 'Post/Form'
import logo from 'assets/images/logo.svg'

export default observer(function Home() {
  const { data, isLoading } = useQuery('posts', () =>
    api.post.list({ limit: 20, offset: 0 }),
  )
  const [showPostForm, togglePostForm] = useToggle(false)

  return (
    <>
      {showPostForm && <PostForm onClose={togglePostForm} />}
      <div className="mt-8 flex">
        <div
          style={{ maxWidth: '640px' }}
          className="w-full pb-12 flex-shrink-0"
        >
          <div
            className="bg-white p-5 flex-center mb-5 shadow"
            onClick={togglePostForm}
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: '60px', height: '60px' }}
            />
            <input
              type="text"
              className="ml-3 w-full rounded-full border border-gray-bc bg-gray-f7 focus:outline-none px-6 placeholder-gray-6b focus:border-gray-97"
              style={{ height: '56px' }}
              placeholder="What do you want to post?"
            />
          </div>
          {UploadingPostsStore.posts.map((post) => (
            <Post key={post.id} post={post} uploading={true} />
          ))}
          {isLoading && (
            <div className="flex-center mb-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
          {!isLoading &&
            data &&
            data.map((post) => <Post key={post.id} post={post} />)}
          <LevelComplete />
          <Phrase />
        </div>
        <div className="ml-10 flex-grow">
          <Notebook />
        </div>
      </div>
    </>
  )
})
