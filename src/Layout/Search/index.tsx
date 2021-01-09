import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import useToggle from 'utils/useToggle'
import { CloseCircle } from '@styled-icons/ionicons-solid/CloseCircle'
import cn from 'classnames'

export default function Search() {
  const [searchValue, setSearchValue] = React.useState('')
  const [searchFocused, toggleSearchFocus] = useToggle()

  return (
    <div
      style={{ width: '205px' }}
      className="h-8 rounded-full border bg-gray-fc relative overflow-hidden border-gray-97"
    >
      <div
        className="relative text-gray-a4 h-full transition duration-200"
        style={{
          transform: `translateX(${searchFocused || searchValue ? 0 : 47}px`,
        }}
      >
        <div className="h-full uppercase text-sm font-bold absolute top-0 left-0 bottom-0 flex-center ml-3 duration-200 transition">
          <SearchIcon size={14} className="mr-1" />
          <div
            className={cn(
              'duration-200 transition',
              Boolean(searchFocused || searchValue) && 'opacity-0',
            )}
          >
            Schoool
          </div>
        </div>
        <input
          onFocus={toggleSearchFocus}
          onBlur={toggleSearchFocus}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn(
            'absolute-fill opacity-0 px-8 rounded-full text-gray-97 font-bold',
            (searchFocused || searchValue) && 'opacity-100',
          )}
        />
        <button
          onMouseDown={(e) => {
            setSearchValue('')
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
  )
}
