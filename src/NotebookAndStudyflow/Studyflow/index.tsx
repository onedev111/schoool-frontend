import React from 'react'
import Placeholder from './Placeholder'
import { Plus } from '@styled-icons/fa-solid/Plus'
import List from './List'
import Form from 'NotebookAndStudyflow/Studyflow/Form'

const list = [
  {
    title: 'Title of the StudyFlow',
  },
  {
    title: 'Title of the StudyFlow',
  },
  {
    title: 'Title of the StudyFlow',
  },
]

type Props = {
  showMenu: boolean
  toggleMenu(): void
}

export default function Notebook({ showMenu, toggleMenu }: Props) {
  if (!showMenu) return <Form toggleMenu={toggleMenu} />

  return (
    <>
      <div className="flex-center p-3 border-b border-gray-c5">
        <button
          style={{ width: '154px', height: '30px' }}
          type="button"
          className="bg-gray-5b text-white rounded-full text-sm uppercase flex-center"
          onClick={toggleMenu}
        >
          <Plus className="mr-2" size={18} />
          Conversation
        </button>
        <button
          style={{ width: '154px', height: '30px' }}
          type="button"
          className="bg-gray-5b text-white rounded-full text-sm uppercase flex-center ml-5"
          onClick={toggleMenu}
        >
          <Plus className="mr-2" size={18} />
          Repetition
        </button>
      </div>
      {list.length === 0 && <Placeholder />}
      {list.length > 0 && <List list={list} />}
    </>
  )
}
