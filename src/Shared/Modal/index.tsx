import React from 'react'

type Props = {
  children: React.ReactNode
  onClose(): void
  style?: React.CSSProperties
}

export default function Modal({ children, onClose, style }: Props) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex-center"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg border border-gray-bb shadow text-center w-full"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
