import React from 'react'
import cn from 'classnames'
import Notebook from './Notebook'
import Studyflow from './Studyflow'

export default function NotebookWidget() {
  const [currentTab, setCurrentTab] = React.useState('notebook')

  return (
    <div
      className="shadow bg-white flex flex-col"
      style={{ minHeight: '924px' }}
    >
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
            currentTab === 'studyflow' && 'bg-red-primary text-white',
          )}
          onClick={() => setCurrentTab('studyflow')}
        >
          Studyflow
        </div>
      </div>
      <div className="flex-grow relative">
        {currentTab === 'notebook' && <Notebook />}
        {currentTab === 'studyflow' && <Studyflow />}
      </div>
    </div>
  )
}
