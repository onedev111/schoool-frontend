import React from 'react'
import cn from 'classnames'
import { Plus } from '@styled-icons/boxicons-regular/Plus'
import Item from './Item'
import State from 'Class/State'
import { useQuery } from 'react-query'
import api from 'api'

type Props = {
  className?: string
}

export default function ClassesList({ className }: Props) {
  const { data } = useQuery('classes', api.classes.list)

  return (
    <div
      className={cn('bg-white shadow p-6 flex-grow flex flex-col', className)}
    >
      <div className="flex-grow pb-6">
        {data?.owning && data.owning.length && (
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
        {data?.owning && data.owning.length && (
          <>
            {data.owning.map((item) => (
              <Item
                key={item.id}
                image={item.image}
                title={item.name}
                name={item.owner.name}
              />
            ))}
          </>
        )}
        {data?.joined && data.joined.length > 0 && (
          <>
            <div className="text-gray-6b text-lg uppercase mt-6 mb-3">
              My Joined Classes
            </div>
            {data.joined.map((item) => (
              <Item
                key={item.id}
                image={item.image}
                title={item.name}
                name={item.owner.name}
              />
            ))}
          </>
        )}
        {data?.processing && data.processing.length > 0 && (
          <>
            <div className="text-gray-6b text-lg uppercase mt-6 mb-3">
              CLASSES IN PROGRESS
            </div>
            {data.processing.map((item) => (
              <Item
                key={item.id}
                image={item.image}
                title={item.name}
                name={item.owner.name}
              />
            ))}
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