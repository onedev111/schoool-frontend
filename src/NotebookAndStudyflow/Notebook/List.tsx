import React from 'react'
import CircleCheckbox from 'Shared/CircleCheckbox'

type Props = {
  list: { id: number; text: string; translation: string }[]
  selecting: boolean
  checkedIds: Record<number, boolean>
  toggleItem(id: number): void
}

export default function List({
  list,
  selecting,
  checkedIds,
  toggleItem,
}: Props) {
  return (
    <div className="border-t border-gray-c5">
      {list.map((item) => (
        <div
          key={item.id}
          className="text-17 py-3 px-4 border-b border-gray-c5 flex items-center"
          onClick={() => selecting && toggleItem(item.id)}
        >
          <div className="flex-grow">
            {item.text}
            {selecting && (
              <div className="text-gray-6b mt-2">{item.translation}</div>
            )}
          </div>
          {selecting && (
            <CircleCheckbox
              className="flex-shrink-0 ml-2"
              checked={checkedIds[item.id]}
            />
          )}
        </div>
      ))}
    </div>
  )
}
