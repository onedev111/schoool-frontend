import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import { useInfiniteQuery } from 'react-query'
import api from 'api'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { useKey } from 'react-use'
import cn from 'classnames'
import history from 'utils/history'

const scrollLoadThreshold = 350
const limit = 20

export default function Search() {
  const [enabled, setEnabled] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(-1)

  const {
    data: pages,
    isLoading,
    isFetching,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['searchTags', { query }],
    (key, { search }, page = 0) => {
      return api.classes.search({
        query,
        limit,
        offset: (page as number) * 20,
      })
    },
    {
      getFetchMore: (lastPage, pages) =>
        lastPage.length > 0 ? pages.length : undefined,
      enabled,
    },
  )

  React.useEffect(() => {
    const listener = (e: Event) => {
      const el = e.target as HTMLElement
      if (!el.closest('.js-classes-search')) setEnabled(false)
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])

  const onScroll = (e: any) => {
    const el = (e as { target: HTMLElement }).target
    if (
      canFetchMore &&
      !isLoading &&
      !isFetching &&
      el.scrollHeight - el.offsetHeight - el.scrollTop <= scrollLoadThreshold
    ) {
      fetchMore()
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEnabled(true)
    setQuery(value)
    setActive(-1)
  }

  const total = pages ? pages.reduce((sum, page) => sum + page.length, 0) : 0
  useKey('Escape', () => setEnabled(false))
  useKey(
    'ArrowDown',
    () => {
      setActive((active) => (active < total - 1 ? active + 1 : active))
    },
    {},
    [total],
  )
  useKey(
    'ArrowUp',
    () => {
      setActive((active) => (active > -1 ? active - 1 : active))
    },
    {},
    [total],
  )
  useKey(
    'Enter',
    () => {
      if (!pages || active === -1) return

      const item = pages[Math.floor(active / limit)][active % limit]
      if (item) history.push(routes.class(item.id))
    },
    {},
    [pages, active],
  )

  let index = 0

  return (
    <div className="bg-white shadow py-4 px-6 relative js-classes-search">
      <div className="relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center ml-5 text-gray-a4">
          <SearchIcon size={14} />
        </div>
        <input
          type="search"
          className="bg-gray-f7 border border-gray-bc rounded-full h-10 flex items-center pl-10 pr-4 w-full font-bold placeholder-gray-6b"
          placeholder="Search classes"
          value={query}
          onChange={onChange}
          onFocus={() => setEnabled(true)}
          onClick={() => setEnabled(true)}
        />
      </div>
      {enabled && pages && pages.length > 0 && (
        <div className="absolute left-0 right-0 z-30 mt-2 px-5">
          <div
            className="bg-white rounded overflow-auto"
            style={{
              maxHeight: '400px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, .3)',
            }}
            onScroll={onScroll}
          >
            {pages.map((page, i) => {
              const pageLength = page.length
              index += pageLength

              return (
                <React.Fragment key={i}>
                  {page.map((item, i) => (
                    <div
                      className={cn(
                        'flex items-center px-5 py-2 transition duration-200 hover:bg-blue-light',
                        active === index + i - pageLength
                          ? 'bg-blue-light'
                          : 'bg-white',
                      )}
                      key={item.id}
                    >
                      <Link
                        to={routes.class(item.id)}
                        className="w-8 h-8 rounded-full mr-2 bg-center bg-cover"
                        style={{ backgroundImage: `url("${item.image}")` }}
                      />
                      <div className="flex justify-center flex-col">
                        <Link
                          to={routes.class(item.id)}
                          className="text-lg text-black font-bold hover:underline"
                        >
                          {item.name}
                        </Link>
                        <Link
                          to={routes.user(item.owner.id)}
                          className="text-sm text-gray-97 font-bold hover:underline"
                        >
                          {item.owner.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
