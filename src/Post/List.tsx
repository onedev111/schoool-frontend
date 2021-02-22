import React from 'react'
import Spin from 'assets/images/icons/Spin'
import PostItem from 'Post/Card/Card'
import api from 'api'
import useRecords from 'utils/useRecords'
import { Post, UsefulExpression } from 'Post/types'
import UsefulExpressionItem from './UsefulExpression'
import LevelComplete from 'Post/UsefulExpression/LevelComplete'

type Props = {
  userId?: number
  classId?: number
  savedPosts?: boolean
  search?: string
  usefulExpressions?: boolean
  children?: React.ReactNode
}

type Page = {
  posts: Post[]
  usefulExpressions: UsefulExpression[]
}

const getNextPageParam = (lastPage: Page, pages: Page[]) =>
  lastPage.posts.length > 0
    ? pages.reduce((sum, page) => sum + page.posts.length, 0)
    : undefined

export default function Posts({
  userId,
  classId,
  savedPosts: loadSavedPosts,
  search,
  usefulExpressions: showUsefulExpressions = false,
  children,
}: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null)

  const { data: savedPosts, isFetching: isFetchingSavedPosts } = useRecords<
    Page
  >({
    key: ['posts', 'saved', { classId }],
    load: ({ limit, offset }) =>
      api.post.listSaved({ classId, limit, offset }).then((posts) => ({
        posts,
        usefulExpressions: [] as UsefulExpression[],
      })),
    getNextPageParam,
    loadOnScroll: {
      ref: wrapRef,
      threshold: 500,
    },
    options: {
      enabled: loadSavedPosts,
    },
  })

  const { data: allPosts, isFetching: isFetchingAllPosts } = useRecords<Page>({
    key: ['posts', { classId, userId, search }],
    load: ({ limit, offset }) => {
      if (userId)
        return api.post
          .userPosts({ userId, search, limit, offset })
          .then((posts) => ({
            posts,
            usefulExpressions: [] as UsefulExpression[],
          }))
      else return api.post.list({ classId, limit, offset })
    },
    getNextPageParam,
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
            {showUsefulExpressions && page === 0 && posts[0] && (
              <PostItem post={posts[0]} />
            )}

            {showUsefulExpressions &&
              page === 0 &&
              usefulExpressions.map((item) => (
                <UsefulExpressionItem key={item.id} item={item} />
              ))}

            {showUsefulExpressions &&
              page === 0 &&
              usefulExpressions.length === 0 && <LevelComplete />}

            {(showUsefulExpressions && page === 0 ? posts.slice(1) : posts).map(
              (post) => (
                <PostItem key={post.id} post={post} />
              ),
            )}
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
