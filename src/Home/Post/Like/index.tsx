import React from 'react'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import useToggle from 'Shared/useToggle'
import cn from 'classnames'

export default function Index() {
  const [liked, toggle] = useToggle()

  return (
    <button
      className={cn(
        'w-1/4 text-center text-gray-5f transition duration-200',
        liked && 'text-blue-primary',
      )}
      onClick={toggle}
    >
      <Heart size={34} />
    </button>
  )
}
