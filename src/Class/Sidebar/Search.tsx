import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import api from 'api'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { useKey } from 'react-use'
import cn from 'classnames'
import history from 'utils/history'
import Spin from 'assets/images/icons/Spin'
import useRecords from 'utils/useRecords'

type Props = {
  isSearchOpen: boolean
  setSearchOpen(value: boolean): void
}

const limit = 20

export default function Search({ isSearchOpen, setSearchOpen }: Props) {
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(-1)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const { data, isFetching } = useRecords({
    key: ['searchTags', { query }],
    load: ({ limit, offset }) => api.classes.search({ query, limit, offset }),
    loadOnScroll: {
      ref: scrollRef,
      threshold: 350,
    },
    limit,
    options: {
      enabled: isSearchOpen,
    },
  })

  React.useEffect(() => {
    const listener = (e: Event) => {
      const el = e.target as HTMLElement
      if (!el.closest('.js-classes-search')) setSearchOpen(false)
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchOpen(true)
    setQuery(value)
    setActive(-1)
  }

  const total = data
    ? data.pages.reduce((sum, page) => sum + page.length, 0)
    : 0
  useKey('Escape', () => setSearchOpen(false))
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
      if (!data || active === -1) return

      const item = data.pages[Math.floor(active / limit)][active % limit]
      if (item) history.push(routes.class(item.id))
    },
    {},
    [data?.pages, active],
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
          onFocus={() => setSearchOpen(true)}
          onClick={() => setSearchOpen(true)}
        />
      </div>
      {isSearchOpen && (
        <div className="absolute left-0 right-0 z-30 mt-2 px-5">
          <div
            className="bg-white rounded overflow-auto"
            style={{
              maxHeight: '400px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, .3)',
            }}
            ref={scrollRef}
          >
            {data &&
              data.pages.map((page, i) => {
                const pageLength = page.length
                index += pageLength

                return (
                  <React.Fragment key={i}>
                    {page.map((item, i) => (
                      <Link
                        to={routes.class(item.id)}
                        className={cn(
                          'flex items-center px-5 py-2 transition duration-200 hover:bg-blue-light',
                          active === index + i - pageLength
                            ? 'bg-blue-light'
                            : 'bg-white',
                        )}
                        key={item.id}
                      >
                        <div
                          className="w-8 h-8 rounded-full mr-2 bg-center bg-cover"
                          style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div className="flex justify-center flex-col">
                          <div className="text-lg text-black font-bold hover:underline">
                            {item.name}
                          </div>
                          <div
                            className="text-sm text-gray-97 font-bold hover:underline"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              history.push(routes.user(item.owner.id))
                            }}
                          >
                            {item.owner.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </React.Fragment>
                )
              })}
            {isFetching && (
              <div className="flex-center my-5">
                <Spin className="w-10 h-10 text-blue-primary animate-spin" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
