import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import Posts from 'Post/List'
import Tabs from 'Shared/Tabs'
import routes from 'routes'
import { useRouteMatch } from 'react-router-dom'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import history from 'utils/history'

type Props = {
  isMe: boolean
  userId: number
}

export default function UserContent({ isMe, userId }: Props) {
  const location = useLocation()
  const search = new URLSearchParams(location.search).get('search') || ''
  const setSearch = (search: string) => {
    const path = isMe ? routes.user('me') : routes.user(userId)
    if (search) history.push(`${path}?search=${encodeURIComponent(search)}`)
    else history.push(path)
  }

  const [searchValue, setSearchValue] = React.useState(search)

  React.useEffect(() => {
    setSearchValue(search)
  }, [search])

  const { path } = useRouteMatch<{ id: string }>()
  const allPosts = path !== routes.userSavedPosts()

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(searchValue)
  }

  return (
    <>
      <div className="bg-white py-4 px-6 shadow mb-5 relative">
        <div
          className={cn(
            'absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-8b transition-all duration-200',
            search ? 'opacity-100' : 'opacity-0',
          )}
        >
          <button
            type="button"
            onClick={() => {
              setSearchValue('')
              setSearch('')
            }}
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <form
          className={cn(
            'relative transition-all duration-200',
            search ? 'ml-10' : 'ml-0',
          )}
          onSubmit={submitSearch}
        >
          <div className="absolute top-0 left-0 bottom-0 flex-center ml-5 text-gray-a4">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            className="bg-gray-f7 border border-gray-bc rounded-full h-10 flex items-center pl-10 pr-4 w-full font-bold placeholder-gray-6b"
            placeholder="Search posts"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      {isMe && (
        <Tabs
          tabs={[
            {
              label: 'All posts',
              value: 'all',
              onClick: () => history.push(routes.user('me')),
            },
            {
              label: 'Saved posts',
              value: 'saved',
              onClick: () => history.push(routes.userSavedPosts()),
            },
          ]}
          activeTab={allPosts ? 'all' : 'saved'}
        />
      )}
      <Posts userId={userId} savedPosts={!allPosts} search={search} />
    </>
  )
}
