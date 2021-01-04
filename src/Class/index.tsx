import React from 'react'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import ClassesBlock from 'Class/ClassesBlock'

export default function Class() {
  return (
    <div className="flex mt-10">
      <div className="w-full mr-5" style={{ maxWidth: '420px' }}>
        <div className="bg-white shadow py-4 px-6">
          <div className="relative">
            <div className="absolute top-0 left-0 bottom-0 flex-center ml-5 text-gray-a4">
              <SearchIcon size={14} />
            </div>
            <input
              type="search"
              className="bg-gray-f7 border border-gray-bc rounded-full h-10 flex items-center pl-10 pr-4 w-full font-bold placeholder-gray-6b"
              placeholder="Search classes"
            />
          </div>
        </div>
        <ClassesBlock className="mt-4" />
      </div>
      <div className="w-full" style={{ maxWidth: '640px' }}></div>
    </div>
  )
}
