import React from 'react'
import { Book } from '@styled-icons/fa-solid/Book'

export default function Placeholder() {
  return (
    <div className="flex-center flex-col mx-16 mb-16">
      <div
        style={{ width: '60px', height: '60px' }}
        className="bg-mustard-primary flex-center rounded-full mb-3"
      >
        <Book size={27} className="text-white" />
      </div>
      <div className="text-black mb-3 text-center">
        You can repeat and practice the English expressions you keep here on the
        SCHOOOL app.
      </div>
      <div className="flex-center">
        <div className="text-sm font-bold">iOS Download</div>
        <div className="text-sm font-bold ml-3">Android Download</div>
      </div>
    </div>
  )
}
