import React from 'react'
import classIcon from 'assets/images/icons/class.png'
import Spin from 'assets/images/icons/Spin'
import Post from 'Post/Item'
import { PostStore, useData } from 'Post/Store'
import { observer } from 'mobx-react-lite'

export default observer(function Posts() {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const { isFetching, items } = useData({ ref: wrapRef, threshold: 500 })

  if (!isFetching && items?.length === 0)
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
    <div ref={wrapRef}>
      {PostStore.items?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetching && (
        <div className="flex-center mt-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
    </div>
  )
})
