import React from 'react'
import cn from 'classnames'

type Props = {
  label: string
  labelHeightClass?: string
  children: React.ReactNode
}

export default function FormGroup({
  label,
  labelHeightClass = 'h-10',
  children,
}: Props) {
  return (
    <div className="flex mt-10">
      <div
        className={cn(
          'flex items-center justify-end w-56 mr-8 text-lg',
          labelHeightClass,
        )}
      >
        {label}
      </div>
      <div className="relative w-400px">{children}</div>
    </div>
  )
}
