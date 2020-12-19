import React from 'react'
import PostForm from './PostForm'
import Post from './Post'
import Phrase from './Phrase'
import Notebook from './Notebook'

export default function Home() {
  return (
    <div className="mt-8 flex">
      <div style={{ maxWidth: '640px' }} className="w-full pb-12 flex-shrink-0">
        <PostForm />
        <Post />
        <Phrase />
      </div>
      <div className="ml-10 flex-grow">
        <Notebook />
      </div>
    </div>
  )
}
