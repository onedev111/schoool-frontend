import React from 'react'
import ClassesBlock from 'Class/ClassesBlock'
import ClassesList from 'Class/ClassesList'
import Search from 'Class/Search'
import Posts from './Posts'

export default function Class() {
  return (
    <div className="flex py-10 h-full">
      <div
        className="w-full mr-5 h-full flex flex-col"
        style={{ maxWidth: '420px' }}
      >
        <Search />
        <ClassesBlock className="mt-4" />
        <ClassesList className="mt-4" />
      </div>
      <div className="w-full flex-shrink-0" style={{ maxWidth: '640px' }}>
        <Posts />
      </div>
    </div>
  )
}