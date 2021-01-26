import React from 'react'
import { Plus } from '@styled-icons/fa-solid/Plus'
import { Edit } from '@styled-icons/boxicons-regular/Edit'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { TrashAlt } from '@styled-icons/fa-regular/TrashAlt'
import useToggle from 'utils/useToggle'
import CircleCheckbox from 'Shared/CircleCheckbox'
import cn from 'classnames'
import Placeholder from 'Notebook/Placeholder'
import { observer } from 'mobx-react-lite'
import SentencesDelete from 'Notebook/Delete'
import SentenceItem from 'Notebook/Item'
import AddSentence from 'Notebook/AddSentence'
import Spin from 'assets/images/icons/Spin'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'
import useRecords from 'utils/useRecords'
import api from 'api'
import { useQuery } from 'react-query'

const maxFreeSentences = 100

export default observer(function Notebook() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { data, isFetching } = useRecords({
    key: ['notebookSentences'],
    load: api.notebook.list,
    loadOnScroll: {
      ref,
      threshold: 300,
    },
  })
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
      data?.pages.forEach((page) => page.forEach(({ id }) => (all[id] = true)))
      setCheckedIds(all)
    }
    setCheckAll(!allChecked)
  }

  const selectedIds = Object.keys(checkedIds)

  const { data: countsAndIsPremium } = useQuery(
    ['countsAndIsPremium'],
    api.app.getCountsAndIsPremium,
  )

  const total = countsAndIsPremium?.notebookCount || 0

  return (
    <>
      {deleteModal && (
        <SentencesDelete checkedIds={checkedIds} onClose={toggleDeleteModal} />
      )}
      {addModal && (
        <AddSentence
          onClose={toggleAddModal}
          title="Add Expressions"
          buttonText="Add"
          contentClass="pt-4 px-5 pb-6"
          buttonWrapClass="flex-center mt-5"
        />
      )}
      <div className="flex flex-shrink-0 justify-between p-4">
        {!selecting && (
          <>
            <div className="text-blue-primary uppercase">Total {total}</div>
            <div className="text-gray-45">
              <button type="button" onClick={toggleAddModal}>
                <Plus size={17} />
              </button>
              {data && data.pages.length > 0 && (
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
      <div className="flex-grow flex flex-1 min-h-0">
        {data && data.pages.length === 0 && <Placeholder />}
        {data && data.pages.length !== 0 && (
          <div
            className="border-t border-gray-c5 flex-1 overflow-auto"
            ref={ref}
          >
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.map((item) => (
                  <SentenceItem
                    key={item.id}
                    sentence={item}
                    selecting={selecting}
                    checkedIds={checkedIds}
                    toggleItem={toggleItem}
                  />
                ))}
              </React.Fragment>
            ))}
            {isFetching && (
              <div className="flex-center my-5">
                <Spin className="w-10 h-10 text-blue-primary animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
})
