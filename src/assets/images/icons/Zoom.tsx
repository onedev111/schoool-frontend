import React from 'react'
import { Zoom } from '@styled-icons/boxicons-logos/Zoom'

export default function ZoomIcon({ size }: { size: number }) {
  return (
    <div
      className="text-white rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        padding: '2px',
        boxShadow: '0 0 2px rgba(0, 0, 0, .3)',
      }}
    >
      <div
        className="w-full h-full rounded-full flex-center"
        style={{ background: '#4a8cff' }}
      >
        <Zoom size={size - 10} />
      </div>
    </div>
  )
}
