import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import { useKey } from 'react-use'
import useHideBodyScroll from 'utils/useHideBodyScroll'
import { Dayjs } from 'dayjs'
import { Link } from 'react-router-dom'
import routes from 'routes'

type Props = {
  user: { id: number; name: string }
  date: Dayjs
  children: React.ReactNode
  onClose(): void
}

export default function Fullscreen({ user, date, children, onClose }: Props) {
  useKey('Escape', onClose)
  useHideBodyScroll()

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-gray-2a">
      <div className="absolute top-0 left-0 mt-6 ml-8">
        <Link
          to={routes.user(user.id)}
          className="text-17 text-white hover:underline"
        >
          {user.name}
        </Link>
        <div className="text-sm text-gray-bb mt-2">
          Updated {date.format('MMMM DD, YYYY')}
        </div>
      </div>
      <button
        type="button"
        className="absolute top-0 right-0 mt-3 mr-3 text-gray-bb z-10"
        onClick={onClose}
      >
        <X size={50} />
      </button>
      {children}
    </div>
  )
}
