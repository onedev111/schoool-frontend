import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import cn from 'classnames'

type Props = {
  className?: string
  video: string
  removeVideo(): void
}

export default function VideoPreview({ video, className, removeVideo }: Props) {
  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        className="w-10 h-10 flex-center text-white absolute top-0 right-0 mt-5 mr-7 z-10"
        style={{ background: 'rgba(0, 0, 0, .3)' }}
        onClick={removeVideo}
      >
        <X size={28} />
      </button>
      <video src={video} controls className="w-full" />
    </div>
  )
}
