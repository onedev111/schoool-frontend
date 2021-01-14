import React from 'react'
import Placeholder from './Placeholder'
import { Plus } from '@styled-icons/fa-solid/Plus'
import List from './List'
import Form from 'NotebookAndStudyflow/Studyflow/Form'
import { useStudyFlow } from 'NotebookAndStudyflow/Studyflow/Store'
import { StudyFlowType } from 'NotebookAndStudyflow/Studyflow/types'

type Props = {
  showMenu: boolean
  toggleMenu(): void
}

export default function Notebook({ showMenu, toggleMenu }: Props) {
  const { items } = useStudyFlow()
  const [addType, setAddType] = React.useState<StudyFlowType>()

  const addConversation = () => {
    toggleMenu()
    setAddType('conversation')
  }

  const addRepetition = () => {
    toggleMenu()
    setAddType('repetition')
  }

  const closeForm = () => {
    toggleMenu()
    setAddType(undefined)
  }

  if (addType) return <Form type={addType} onClose={closeForm} />

  return (
    <>
      <div className="flex-center p-3 border-b border-gray-c5">
        <button
          style={{ width: '160px', height: '30px' }}
          type="button"
          className="bg-gray-5b text-white rounded-full text-sm uppercase flex-center"
          onClick={addConversation}
        >
          <Plus className="mr-2" size={18} />
          Conversation
        </button>
        <button
          style={{ width: '160px', height: '30px' }}
          type="button"
          className="bg-gray-5b text-white rounded-full text-sm uppercase flex-center ml-5"
          onClick={addRepetition}
        >
          <Plus className="mr-2" size={18} />
          Repetition
        </button>
      </div>
      {items.length === 0 && <Placeholder />}
      {items.length > 0 && <List items={items} />}
    </>
  )
}
