import React from 'react'
import Search from 'Class/Sidebar/Search'
import ClassesBlock from 'Class/Sidebar/ClassesBlock'
import ClassesList from 'Class/Sidebar/ClassesList'
import Sidebar from 'Shared/Sidebar'

export default function ClassSidebar() {
  const [isSearchOpen, setSearchOpen] = React.useState(false)

  return (
    <Sidebar className="mr-5">
      <Search isSearchOpen={isSearchOpen} setSearchOpen={setSearchOpen} />
      <ClassesBlock className="mt-4" setSearchOpen={setSearchOpen} />
      <ClassesList className="mt-4" />
    </Sidebar>
  )
}
