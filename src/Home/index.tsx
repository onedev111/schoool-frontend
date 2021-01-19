import React from 'react'
import Post from 'Post/Item'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import { observer } from 'mobx-react-lite'
import Spin from 'assets/images/icons/Spin'
import useToggle from 'utils/useToggle'
import PostForm from 'Post/Form'
import logo from 'assets/images/logo.svg'
import { PostStore } from 'Post/Store'
import Sidebar from 'Home/Sidebar'
import { useData } from 'Post/Store'

export default observer(function Home() {
  const [showPostForm, togglePostForm] = useToggle(false)
  const postsWrapRef = React.useRef<HTMLDivElement>(null)

  const { isFetching, items } = useData({ ref: postsWrapRef, threshold: 500 })

  return (
    <>
      {showPostForm && <PostForm onClose={togglePostForm} />}
      <div className="h-full flex">
        <div style={{ maxWidth: '640px' }} className="w-full pt-8 pb-12">
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
              className="ml-3 w-full rounded-full border border-gray-bc bg-gray-f7 px-6 placeholder-gray-6b pointer-events-none"
              style={{ height: '56px' }}
              disabled
              placeholder="What do you want to post?"
            />
          </div>
          {items.length > 0 && (
            <div ref={postsWrapRef}>
              {PostStore.items.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          )}
          {isFetching && (
            <div className="flex-center mb-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
          <LevelComplete />
          <Phrase />
        </div>
        <Sidebar />
      </div>
    </>
  )
})
