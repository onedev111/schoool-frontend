import React from 'react'
import Spin from 'assets/images/icons/Spin'
import PostItem from 'Post/Item'
import api from 'api'
import useRecords from 'utils/useRecords'
import { Post, UsefulExpression } from 'Post/types'
import UsefulExpressionItem from './UsefulExpression'
import LevelComplete from 'Post/UsefulExpression/LevelComplete'

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
    load: ({ limit, offset }) =>
      api.post.listSaved({ classId, limit, offset }).then((posts) => ({
        posts,
        usefulExpressions: [] as UsefulExpression[],
      })),
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
      if (userId)
        return api.post.userPosts({ userId, limit, offset }).then((posts) => ({
          posts,
          usefulExpressions: [] as UsefulExpression[],
        }))
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
      {posts?.pages.map(
        (
          {
            posts,
            usefulExpressions,
          }: { posts: Post[]; usefulExpressions: UsefulExpression[] },
          page,
        ) => (
          <React.Fragment key={page}>
            {page === 0 && posts[0] && <PostItem post={posts[0]} />}

            {page === 0 &&
              usefulExpressions.map((item) => (
                <UsefulExpressionItem key={item.id} item={item} />
              ))}

            {page === 0 && usefulExpressions.length === 0 && <LevelComplete />}

            {(page === 0 ? posts.slice(1) : posts).map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </React.Fragment>
        ),
      )}
      {isFetching && (
        <div className="flex-center my-5">
          <Spin className="w-10 h-10 text-blue-primary animate-spin" />
        </div>
      )}
    </div>
  )
}
