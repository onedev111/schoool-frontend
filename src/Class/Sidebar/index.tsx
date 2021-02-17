import React from 'react'
import Search from 'Class/Sidebar/Search'
import ClassesBlock from 'Class/Sidebar/ClassesBlock'
import ClassesList from 'Class/Sidebar/ClassesList'
import Sidebar from 'Shared/Sidebar'
import style from './style.module.css'
import cn from 'classnames'

export default function ClassSidebar() {
  const [isSearchOpen, setSearchOpen] = React.useState(false)

  return (
    <Sidebar className={cn('mr-5', style.hideOnSmallScreen)}>
      <Search isSearchOpen={isSearchOpen} setSearchOpen={setSearchOpen} />
      <ClassesBlock className="mt-4" setSearchOpen={setSearchOpen} />
      <ClassesList className="mt-4" />
    </Sidebar>
  )
}
