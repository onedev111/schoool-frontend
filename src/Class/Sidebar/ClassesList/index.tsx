import React from 'react'
import cn from 'classnames'
import { Plus } from '@styled-icons/boxicons-regular/Plus'
import Item from './Item'
import State from 'Class/State'

type Props = {
  className?: string
}

export default function ClassesList({ className }: Props) {
  const hasClasses = true

  return (
    <div
      className={cn('bg-white shadow p-6 flex-grow flex flex-col', className)}
    >
      <div className="flex-grow pb-6">
        {hasClasses && (
          <div className="text-gray-6b text-lg uppercase mb-3">
            My Created Classes
          </div>
        )}
        <button
          type="button"
          className="flex-center mb-4"
          onClick={() => State.toggleCreateModal()}
        >
          <div className="w-15 h-15 rounded-full border border-gray-a4 text-gray-a4 flex-center mr-3 font-bold text-lg">
            <Plus size={32} />
          </div>
          <div className="text-lg text-black font-bold">Create a Class</div>
        </button>
        {hasClasses && (
          <>
            <Item color="#F7B500" title="Class Name" name="Mark Kim" />
            <div className="text-gray-6b text-lg uppercase mt-6 mb-3">
              My Joined Classes
            </div>
            <Item color="#32C5FF" title="Class Name" name="Mark Kim" />
            <Item color="#6236FF" title="Class Name" name="Mark Kim" />
            <div className="text-gray-6b text-lg uppercase mt-6 mb-3">
              CLASSES IN PROGRESS
            </div>
            <Item color="#6DD400" title="Class Name" name="Mark Kim" />
          </>
        )}
      </div>
      <div className="text-gray-a4 text-sm uppercase">
        CREATE OR JOIN CLASSES.
        <br />
        STUDY WITH ANYONE IN THE WORLD.
      </div>
    </div>
  )
}
