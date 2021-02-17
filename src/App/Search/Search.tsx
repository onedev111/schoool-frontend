import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import useToggle from 'utils/useToggle'
import { CloseCircle } from '@styled-icons/ionicons-solid/CloseCircle'
import cn from 'classnames'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import useRecords from 'utils/useRecords'
import { Post } from 'Post/types'
import PostCard from 'Post/Card'
import { useDebounce } from 'react-use'

export default function Search() {
  const [search, setSearch] = React.useState('')
  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  const [appliedSearch, setAppliedSearch] = React.useState('')
  const [searchFocused, toggleSearchFocus] = useToggle()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!search) setDebouncedSearch('')
  }, [search])

  useDebounce(
    () => {
      if (search) setDebouncedSearch(search)
    },
    200,
    [search],
  )

  const { data: posts, isLoading } = useRecords<Post[]>({
    key: ['globalSearch', { search: debouncedSearch }],
    load: ({ limit, offset }) =>
      api.app.globalSearch({ search: debouncedSearch, limit, offset }),
    loadOnScroll: {
      ref: scrollRef,
      threshold: 500,
    },
    options: {
      enabled: Boolean(debouncedSearch),
      onSuccess() {
        setAppliedSearch(debouncedSearch)
      },
    },
  })

  return (
    <div className="relative flex items-center h-full">
      <div
        style={{ width: '205px' }}
        className="h-8 rounded-full border bg-gray-fc relative overflow-hidden border-gray-97"
      >
        <div
          className="relative text-gray-a4 h-full transition duration-200"
          style={{
            transform: `translateX(${searchFocused || search ? 0 : 47}px`,
          }}
        >
          <div className="h-full uppercase text-sm font-bold absolute top-0 left-0 bottom-0 flex-center ml-3 duration-200 transition">
            <SearchIcon size={14} className="mr-1" />
            <div
              className={cn(
                'duration-200 transition',
                Boolean(searchFocused || search) && 'opacity-0',
              )}
            >
              Schoool
            </div>
          </div>
          <input
            onFocus={toggleSearchFocus}
            onBlur={toggleSearchFocus}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              'absolute-fill opacity-0 px-8 rounded-full text-black font-bold',
              (searchFocused || search) && 'opacity-100',
            )}
          />
          <button
            onMouseDown={(e) => {
              setSearch('')
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <CloseCircle
              size={20}
              className="absolute top-0 right-0 mr-1 text-gray-c5"
              style={{ marginTop: '5px' }}
            />
          </button>
        </div>
      </div>
      {Boolean(debouncedSearch) && (
        <div
          ref={scrollRef}
          className="absolute z-40 bg-gray-f2 p-5 shadow mt-1 border border-gray-c5 overflow-auto"
          style={{
            top: '100%',
            width: '680px',
            left: '50%',
            marginLeft: '-340px',
            maxHeight: 'calc(100vh - 130px)',
          }}
        >
          {isLoading && (
            <div className="flex-center my-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
          {!isLoading &&
            posts?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    className="mb-5"
                    highlightText={appliedSearch}
                  />
                ))}
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  )
}
