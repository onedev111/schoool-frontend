import React from 'react'
import Dropdown from 'Shared/Dropdown'
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'

const className =
  'h-16 flex-center transition duration-200 hover:bg-gray-f2 cursor-pointer'

export default function Menu() {
  return (
    <Dropdown
      button={<DotsHorizontalRounded size={24} />}
      className="absolute top-0 right-0 mt-8 mr-5 font-bold"
    >
      <div className={`${className}`}>Send Message</div>
      <div className={`${className} text-blue-deep`}>Follow</div>
      <div className={`${className} text-blue-deep`}>Save Post</div>
      <div className={`${className}`}>Share This Post</div>
      <div className={`${className} text-blue-deep`}>Report</div>
      <div className={`${className} text-red-500`}>Delete</div>
    </Dropdown>
  )
}
