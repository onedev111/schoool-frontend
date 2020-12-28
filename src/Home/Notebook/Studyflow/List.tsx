import React from 'react'

type Props = {
  list: {
    title: string
  }[]
}

export default function List({ list }: Props) {
  return (
    <>
      {list.map((item, i) => (
        <div key={i} className="p-3 border-b border-gray-c5">
          <span className="mr-2 relative text-17" style={{ top: '-1px' }}>
            •
          </span>
          {item.title}
        </div>
      ))}
    </>
  )
}
