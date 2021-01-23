import React from 'react'
import classIcon from 'assets/images/icons/class.png'
import Spin from 'assets/images/icons/Spin'
import Post from 'Post/Item'
import { observer } from 'mobx-react-lite'
import api from 'api'
import useRecords from 'utils/useRecords'

type Props = {
  classId?: number
  savedPosts?: boolean
}

export default observer(function Posts({
  classId,
  savedPosts: loadSavedPosts,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null)

  const { data: savedPosts, isFetching: isFetchingSavedPosts } = useRecords({
    key: ['posts', 'saved', { classId }],
    load: ({ limit, offset }) =>
      classId
        ? api.post.listSaved({ classId, limit, offset })
        : Promise.resolve([]),
    loadOnScroll: {
      ref: wrapRef,
      threshold: 500,
    },
    options: {
      enabled: loadSavedPosts,
    },
  })

  const { data: allPosts, isFetching: isFetchingAllPosts } = useRecords({
    key: ['posts', { classId }],
    load: ({ limit, offset }) => api.post.list({ classId, limit, offset }),
    loadOnScroll: {
      ref: wrapRef,
      threshold: 500,
    },
    options: {
      enabled: !loadSavedPosts,
    },
  })

  const posts = loadSavedPosts ? savedPosts : allPosts
  const isFetching = loadSavedPosts ? isFetchingSavedPosts : isFetchingAllPosts

  if (!isFetching && posts?.pages.length === 0)
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
      {posts?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </React.Fragment>
      ))}
      {isFetching && (
        <div className="flex-center my-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
    </div>
  )
})
