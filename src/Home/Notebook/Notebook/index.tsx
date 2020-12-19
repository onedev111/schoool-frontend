import React from 'react'
import { Book } from '@styled-icons/fa-solid/Book'
import { Plus } from '@styled-icons/boxicons-regular/Plus'
import { Edit } from '@styled-icons/boxicons-regular/Edit'

export default function Notebook() {
  return (
    <div>
      <div className="flex justify-between p-4 absolute left-0 top-0 right-0">
        <div className="text-blue-primary uppercase">Total 0</div>
        <div className="text-gray-45">
          <Plus size={22} />
          <Edit className="ml-2" size={20} />
        </div>
      </div>
      <div
        className="flex-center flex-col mx-16 mb-16"
        style={{ marginTop: '300px' }}
      >
        <div
          style={{ width: '60px', height: '60px' }}
          className="bg-mustard-primary flex-center rounded-full mb-3"
        >
          <Book size={27} className="text-white" />
        </div>
        <div className="text-black mb-3 text-center">
          You can repeat and practice the English expressions you keep here on
          the SCHOOOL app.
        </div>
        <div className="flex-center">
          <div className="text-sm font-bold">iOS Download</div>
          <div className="text-sm font-bold ml-3">Android Download</div>
        </div>
      </div>
    </div>
  )
}
