import React from 'react'
import cn from 'classnames'
import useHideBodyScroll from 'utils/useHideBodyScroll'

export const sizes = {
  small: '400px',
  medium: '500px',
  large: '640px',
}

type Props = {
  children: React.ReactNode
  onClose?(): void
  size?: keyof typeof sizes
  className?: string
  width?: number
  [key: string]: any
}

export default function Modal({
  children,
  size = 'medium',
  onClose,
  className,
  width,
  ...props
}: Props) {
  useHideBodyScroll()

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex-center"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
      onClick={onClose}
      {...props}
    >
      <div className="overflow-auto max-h-full w-full py-10 flex flex-wrap justify-center">
        <div
          className={cn(
            'bg-white rounded-lg border border-gray-bb shadow w-full',
            className,
          )}
          style={{ width: width ? `${width}px` : sizes[size] }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
