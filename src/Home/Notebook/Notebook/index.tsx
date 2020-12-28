import React from 'react'
import { Plus } from '@styled-icons/fa-solid/Plus'
import { Edit } from '@styled-icons/boxicons-regular/Edit'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { TrashAlt } from '@styled-icons/fa-regular/TrashAlt'
import useToggle from 'Shared/useToggle'
import CircleCheckbox from 'Shared/CircleCheckbox'
import cn from 'classnames'
import List from 'Home/Notebook/Notebook/List'
import DeleteModal from 'Shared/Modal/Delete'
import Placeholder from 'Home/Notebook/Notebook/Placeholder'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'
import AddSentenceModal from 'Home/Notebook/Notebook/AddSentenceModal'

const list = [
  {
    text:
      'Notebook sentences are written. Font 17. Regular. The full sentence must be shown.',
    translation:
      'Translated sentences are written here. Font 17. Regular. The full sentence must be shown.',
  },
  {
    text:
      'Notebook sentences are written. Font 17. Regular. The full sentence must be shown.',
    translation:
      'Translated sentences are written here. Font 17. Regular. The full sentence must be shown.',
  },
  {
    text:
      'Notebook sentences are written. Font 17. Regular. The full sentence must be shown.',
    translation:
      'Translated sentences are written here. Font 17. Regular. The full sentence must be shown.',
  },
].map((item, i) => ({ ...item, id: i }))

export default function Notebook() {
  const [selecting, toggleSelecting] = useToggle()
  const [allChecked, setCheckAll] = React.useState(false)
  const [checkedIds, setCheckedIds] = React.useState<Record<number, boolean>>(
    {},
  )
  const [deleteModal, toggleDeleteModal] = useToggle()
  const [addModal, toggleAddModal] = useToggle()

  const toggleItem = (id: number) => {
    if (checkedIds[id]) {
      const { [id]: _, ...checked } = checkedIds
      setCheckedIds(checked)
    } else {
      setCheckedIds({ ...checkedIds, [id]: true })
    }
  }

  const toggleCheckAll = () => {
    if (allChecked) setCheckedIds({})
    else {
      const all: Record<number, boolean> = {}
      list.forEach(({ id }) => (all[id] = true))
      setCheckedIds(all)
    }
    setCheckAll(!allChecked)
  }

  const selectedIds = Object.keys(checkedIds)

  return (
    <>
      {deleteModal && <DeleteModal onClose={toggleDeleteModal} />}
      {addModal && false && <NotebookMaxSentences onClose={toggleAddModal} />}
      {addModal && true && <AddSentenceModal onClose={toggleAddModal} />}

      <div className="flex justify-between p-4">
        {!selecting && (
          <>
            <div className="text-blue-primary uppercase">Total 0</div>
            <div className="text-gray-45">
              <button type="button" onClick={toggleAddModal}>
                <Plus size={17} />
              </button>
              {list.length > 0 && (
                <button type="button" onClick={toggleSelecting}>
                  <Edit className="ml-2" size={20} />
                </button>
              )}
            </div>
          </>
        )}
        {selecting && (
          <>
            <div className="flex-center">
              <button type="button" onClick={toggleSelecting}>
                <ArrowLeft size={18} />
              </button>
              <button
                className={cn(
                  'ml-3 transition duration-200',
                  selectedIds.length === 0 && 'opacity-25',
                )}
                type="button"
                onClick={toggleDeleteModal}
                disabled={selectedIds.length === 0}
              >
                <TrashAlt size={18} className="text-blue-primary" />
              </button>
            </div>
            <div className="flex-center">
              <div className="text-17 uppercase">Select all</div>
              <CircleCheckbox
                className="ml-3"
                checked={allChecked}
                onChange={toggleCheckAll}
              />
            </div>
          </>
        )}
      </div>
      {list.length === 0 && <Placeholder />}
      {list.length !== 0 && (
        <List
          list={list}
          selecting={selecting}
          checkedIds={checkedIds}
          toggleItem={toggleItem}
        />
      )}
    </>
  )
}
