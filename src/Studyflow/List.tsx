import React from 'react'
import { StudyFlow } from 'Studyflow/types'

type Props = {
  items: StudyFlow[]
}

export default function List({ items }: Props) {
  return (
    <div className="flex-1 overflow-auto">
      {items.map((item, i) => (
        <div key={i} className="p-3 border-b border-gray-c5">
          <span className="mr-2 relative text-17" style={{ top: '-1px' }}>
            •
          </span>
          {item.title}
        </div>
      ))}
    </div>
  )
}
