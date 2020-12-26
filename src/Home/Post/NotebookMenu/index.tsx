import React from 'react'
import Dropdown from 'Shared/Dropdown'
import Notebook from 'assets/images/icons/notebook'
import cn from 'classnames'

const itemClass =
  'h-16 flex-center transition duration-200 hover:bg-gray-f2 cursor-pointer'

export default function Menu() {
  return (
    <Dropdown
      button={
        <Notebook className="text-gray-5f transition duration-200 hover:text-blue-primary" />
      }
      className={cn('relative z-10 w-1/4 flex-center')}
    >
      <div className={`${itemClass}`}>Send To Study Notes</div>
      <div className={`${itemClass} text-blue-deep`}>Save Post</div>
      <div className={`${itemClass} text-blue-deep`}>Edit</div>
      <div className={`${itemClass} text-red-500`}>Delete</div>
      <div className={`${itemClass}`}>Share This Post</div>
    </Dropdown>
  )
}
