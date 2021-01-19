import React from 'react'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { Class } from 'Class/types'

type Props = {
  item: Class
}

export default function ClassItem({ item }: Props) {
  return (
    <div className="flex items-center mb-4">
      <Link
        to={routes.class(item.id)}
        className="w-15 h-15 rounded-full mr-4 bg-center bg-cover"
        style={{ backgroundImage: `url("${item.image}")` }}
      />
      <div className="flex justify-center flex-col">
        <Link
          to={routes.class(item.id)}
          className="text-lg text-black font-bold mb-1 hover:underline"
        >
          {item.name}
        </Link>
        <Link
          to={routes.user(item.owner.id)}
          className="text-sm text-gray-97 font-bold hover:underline"
        >
          {item.owner.name}
        </Link>
      </div>
    </div>
  )
}
