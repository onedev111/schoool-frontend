import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import Posts from 'Post/List'
import Tabs from 'Shared/Tabs'
import routes from 'routes'
import { useRouteMatch } from 'react-router-dom'

type Props = {
  isMe: boolean
  userId: number
}

export default function UserContent({ isMe, userId }: Props) {
  const [search, setSearch] = React.useState('')

  const { path } = useRouteMatch<{ id: string }>()
  const allPosts = path !== routes.userSavedPosts()

  return (
    <>
      <div className="bg-white py-4 px-6 shadow mb-5">
        <div className="relative">
          <div className="absolute top-0 left-0 bottom-0 flex-center ml-5 text-gray-a4">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            className="bg-gray-f7 border border-gray-bc rounded-full h-10 flex items-center pl-10 pr-4 w-full font-bold placeholder-gray-6b"
            placeholder="Search posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {isMe && (
        <Tabs
          tabs={[
            {
              label: 'All posts',
              value: 'all',
              link: routes.user('me'),
            },
            {
              label: 'Saved posts',
              value: 'saved',
              link: routes.userSavedPosts(),
            },
          ]}
          activeTab={allPosts ? 'all' : 'saved'}
        />
      )}
      <Posts userId={userId} savedPosts={!allPosts} />
    </>
  )
}
