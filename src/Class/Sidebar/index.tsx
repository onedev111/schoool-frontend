import React from 'react'
import Search from 'Class/Sidebar/Search'
import ClassesBlock from 'Class/Sidebar/ClassesBlock'
import ClassesList from 'Class/Sidebar/ClassesList'
import Sidebar from 'Shared/Sidebar'

export default function ClassSidebar() {
  return (
    <Sidebar className="mr-5">
      <Search />
      <ClassesBlock className="mt-4" />
      <ClassesList className="mt-4" />
    </Sidebar>
  )
}
