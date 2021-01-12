import React from 'react'
import Post from 'Post/Item'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import Notebook from './Notebook'
import { useInfiniteQuery } from 'react-query'
import api from 'api'
import { observer } from 'mobx-react-lite'
import Spin from 'assets/images/icons/Spin'
import useToggle from 'utils/useToggle'
import PostForm from 'Post/Form'
import logo from 'assets/images/logo.svg'
import PostStore from 'Post/PostStore'

const postsPerPage = 5
const loadNextThreshold = 500

export default observer(function Home() {
  const query = useInfiniteQuery(
    'posts',
    (key, page = 0) => {
      return api.post.list({
        limit: postsPerPage,
        offset: postsPerPage * (page as number),
      })
    },
    {
      getFetchMore: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length : undefined
      },
    },
  )

  const { data: pages, isLoading, isFetching } = query

  const [showPostForm, togglePostForm] = useToggle(false)
  const postsWrapRef = React.useRef<HTMLDivElement>(null)

  const [queryRef] = React.useState({ current: query })
  queryRef.current = query

  React.useEffect(() => {
    const scrollListener = () => {
      const postsWrap = postsWrapRef.current
      if (!postsWrap) return

      const query = queryRef.current

      if (
        query.canFetchMore &&
        !query.isLoading &&
        !query.isFetching &&
        postsWrap.getBoundingClientRect().bottom - document.body.offsetHeight <
          loadNextThreshold
      )
        query.fetchMore()
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [queryRef])

  React.useEffect(() => {
    PostStore.setPages(pages)
  }, [pages])

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
          {!isLoading && pages && (
            <div ref={postsWrapRef}>
              {PostStore.posts.map((post) => (
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
        <div className="ml-10 flex-grow">
          <Notebook />
        </div>
      </div>
    </>
  )
})
