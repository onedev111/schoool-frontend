import React from 'react'

type Props = {
  image: string
  title: string
  name: string
}

export default function ClassItem({ image, title, name }: Props) {
  return (
    <div className="flex items-center mb-4">
      <div
        className="w-15 h-15 rounded-full mr-4 bg-center bg-cover"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="flex justify-center flex-col">
        <div className="text-lg text-black font-bold mb-1">{title}</div>
        <div className="text-sm text-gray-97 font-bold">{name}</div>
      </div>
    </div>
  )
}