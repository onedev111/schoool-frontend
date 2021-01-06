import React from 'react'
import { useQuery } from 'react-query'
import api from 'api'
import classIcon from 'assets/images/icons/class.png'
import Spin from 'assets/images/icons/Spin'
import Post from 'Post'

export default function Posts() {
  const { data, isLoading } = useQuery('posts', () =>
    api.post.list({ limit: 20, offset: 0 }),
  )

  const hasPosts = true
  if (!hasPosts)
    return (
      <div className="bg-white shadow p-6 h-full">
        <div className="flex-center flex-col mt-32 pt-2">
          <img src={classIcon} alt="class" />
          <div className="text-gray-71 text-17 uppercase mt-6 text-center font-bold">
            CREATE OR JOIN CLASSES.
            <br />
            YOU CAN STUDY WITH ANYONE IN THE WORLD.
          </div>
        </div>
      </div>
    )

  return (
    <>
      {isLoading && (
        <div className="flex-center mt-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
      {!isLoading &&
        data &&
        data.map((post) => <Post key={post.id} post={post} />)}
    </>
  )
}
