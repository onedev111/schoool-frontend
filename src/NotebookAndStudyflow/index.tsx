import React from 'react'
import cn from 'classnames'
import Notebook from './Notebook'
import Studyflow from './Studyflow'
import useToggle from 'utils/useToggle'
import { useLocalStorage } from 'utils/localStorage'

export default function NotebookWidget() {
  const [currentTab, setCurrentTab] = useLocalStorage('notebookTab', 'notebook')

  const [showMenu, toggleMenu] = useToggle(true)

  return (
    <div
      className="shadow bg-white flex flex-col sticky"
      style={{
        top: '32px',
        height: 'calc(100vh - 144px)',
      }}
    >
      {showMenu && (
        <div className="flex text-lg uppercase text-center">
          <div
            className={cn(
              `w-1/2 pt-4 pb-3 bg-gray-dc cursor-pointer`,
              currentTab === 'notebook' && 'bg-mustard-dark text-white',
            )}
            onClick={() => setCurrentTab('notebook')}
          >
            Notebook
          </div>
          <div
            className={cn(
              `w-1/2 pt-4 pb-3 bg-gray-dc cursor-pointer`,
              currentTab === 'studyflow' && 'bg-red-5a text-white',
            )}
            onClick={() => setCurrentTab('studyflow')}
          >
            Studyflow
          </div>
        </div>
      )}
      {currentTab === 'notebook' && <Notebook />}
      {currentTab === 'studyflow' && (
        <Studyflow showMenu={showMenu} toggleMenu={toggleMenu} />
      )}
    </div>
  )
}
