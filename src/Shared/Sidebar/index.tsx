import React from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  contentClass?: string
  children: React.ReactNode
}

export default function Sidebar({ className, contentClass, children }: Props) {
  return (
    <div
      className={cn('pt-8 pb-8 w-full h-full', className)}
      style={{ maxWidth: '420px' }}
    >
      <div
        className={cn('flex flex-col sticky', contentClass)}
        style={{
          top: '32px',
          height: 'calc(100vh - 144px)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
