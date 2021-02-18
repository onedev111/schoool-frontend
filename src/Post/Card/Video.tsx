import React from 'react'
import cn from 'classnames'

type Props = {
  video: string
  className?: string
}

export default function Video({ video, className }: Props) {
  return (
    <video controls className={cn('w-full', className)}>
      <source src={video} type="video/quicktime" />
    </video>
  )
}
