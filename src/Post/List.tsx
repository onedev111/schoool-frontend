import React from 'react'
import Spin from 'assets/images/icons/Spin'
import Post from 'Post/Item'
import api from 'api'
import useRecords from 'utils/useRecords'

type Props = {
  userId?: number
  classId?: number
  savedPosts?: boolean
  children?: React.ReactNode
}

export default function Posts({
  userId,
  classId,
  savedPosts: loadSavedPosts,
  children,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null)

  const { data: savedPosts, isFetching: isFetchingSavedPosts } = useRecords({
    key: ['posts', 'saved', { classId }],
    load: ({ limit, offset }) => api.post.listSaved({ classId, limit, offset }),
    loadOnScroll: {
      ref: wrapRef,
      threshold: 500,
    },
    options: {
      enabled: loadSavedPosts,
    },
  })

  const { data: allPosts, isFetching: isFetchingAllPosts } = useRecords({
    key: ['posts', { classId, userId }],
    load: ({ limit, offset }) => {
      if (userId) return api.post.userPosts({ userId, limit, offset })
      else return api.post.list({ classId, limit, offset })
    },
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

  if (!isFetching && posts?.pages.length === 0 && children)
    return <>{children}</>

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
}
