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
  width?: number | boolean
  scrollingElementRef?: { current: HTMLDivElement | null }
  scroll?: boolean
  [key: string]: any
}

export default function Modal({
  children,
  size = 'medium',
  onClose,
  className,
  width,
  scrollingElementRef,
  scroll = true,
  ...props
}: Props) {
  useHideBodyScroll(scroll)

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex-center"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
      onClick={onClose}
      {...props}
    >
      <div
        className={cn(
          'overflow-auto max-h-full py-10',
          width !== false && 'w-full',
        )}
        ref={scrollingElementRef}
      >
        <div
          className={cn(
            'bg-white rounded-lg border border-gray-bb shadow max-w-full mx-auto',
            className,
          )}
          style={{
            width:
              width !== undefined
                ? width === false
                  ? `${width}px`
                  : undefined
                : sizes[size],
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
