import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import { useKey } from 'react-use'

type Props = {
  children: React.ReactNode
  onClose(): void
}

export default function Fullscreen({ children, onClose }: Props) {
  useKey('Escape', onClose)

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-gray-2a">
      <button
        type="button"
        className="absolute top-0 right-0 mt-3 mr-3 text-gray-bb z-10"
        onClick={onClose}
      >
        <X size={72} />
      </button>
      {children}
    </div>
  )
}
