import React from 'react'
import ClassFormModal from 'Class/Form/Modal'
import State from 'Class/State'
import { observer } from 'mobx-react-lite'
import ClassSidebar from 'Class/Sidebar'

export default observer(function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {State.openCreateModal && (
        <ClassFormModal onClose={() => State.toggleCreateModal()} />
      )}
      <div className="flex h-full">
        <ClassSidebar />
        <div
          className="pt-8 w-full flex-shrink-0"
          style={{ maxWidth: '640px' }}
        >
          {children}
        </div>
      </div>
    </>
  )
})
