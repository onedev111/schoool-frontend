import React from 'react'
import cn from 'classnames'

interface Props {
  placeholder?: string
  className?: string
  type?: string
}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        'px-4 h-10 w-full bg-gray-f5 border border-gray-8b rounded',
        className,
      )}
      {...props}
    />
  )
}
