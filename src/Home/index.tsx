import React from 'react'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import { observer } from 'mobx-react-lite'
import useToggle from 'utils/useToggle'
import PostForm from 'Post/Form'
import logo from 'assets/images/logo.svg'
import Sidebar from 'Home/Sidebar'
import Posts from 'Post/List'

export default observer(function Home() {
  const [showPostForm, togglePostForm] = useToggle(false)

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
          <Posts />
          <LevelComplete />
          <Phrase />
        </div>
        <Sidebar />
      </div>
    </>
  )
})
