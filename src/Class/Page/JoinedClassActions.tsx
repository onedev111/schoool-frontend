import React from 'react'
import { People } from '@styled-icons/material/People'
import { Edit } from '@styled-icons/material/Edit'
import { Settings } from '@styled-icons/material/Settings'
import { Class } from 'Class/types'

type Props = {
  item: Class
}

export default function JoinedClassActions({ item }: Props) {
  return (
    <div className="flex border-t border-gray-d6 py-5 px-16">
      <div className="flex-grow flex">
        <button type="button" className="flex-center flex-col">
          <div className="flex-center w-10 h-10 rounded-full bg-blue-19 text-white">
            <People size={20} />
          </div>
          <div className="text-sm text-gray-5b mt-1">Classmates</div>
        </button>
        <button type="button" className="flex-center flex-col ml-5">
          <div className="flex-center w-10 h-10 rounded-full bg-blue-19 text-white">
            <Edit size={20} />
          </div>
          <div className="text-sm text-gray-5b mt-1">Invite Friends</div>
        </button>
      </div>
      <button type="button" className="flex-center flex-col ml-5">
        <div className="flex-center w-10 h-10 rounded-full bg-blue-008bc2 text-white">
          <Settings size={20} />
        </div>
        <div className="text-sm text-gray-5b mt-1">Settings</div>
      </button>
    </div>
  )
}
