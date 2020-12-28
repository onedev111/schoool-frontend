import React from 'react'
import cn from 'classnames'
import style from './style.module.css'

type DropdownProps = {
  children: React.ReactNode
  button: React.ReactNode
  left?: boolean
  className?: string
  contentClass?: string
}

export default function Dropdown({
  button,
  children,
  className,
  contentClass,
  left,
}: DropdownProps) {
  const [isOpen, setOpen] = React.useState(false)
  const [openClass, setOpenClass] = React.useState(false)
  const [timeout, setTimeoutValue] = React.useState<number | undefined>(
    undefined,
  )

  const open = () => {
    setOpen(true)
    setOpenClass(true)
  }

  const close = () => {
    setOpenClass(false)
    setTimeoutValue(
      (setTimeout(() => {
        setOpen(false)
      }, 300) as unknown) as number,
    )
  }

  const toggle = () => {
    clearTimeout(timeout)
    openClass ? close() : open()
  }

  React.useEffect(() => {
    if (!isOpen) return

    const listener: EventListener = (e) => {
      if (!(e.target as HTMLElement).closest('.js-dropdown')) close()
    }

    window.addEventListener('mousedown', listener)
    return () => window.removeEventListener('mousedown', listener)
  }, [isOpen])

  return (
    <div className={cn('js-dropdown', className)}>
      {isOpen && (
        <div
          className={cn(
            contentClass ||
              'origin-top-right absolute mt-2 rounded-lg shadow-around bg-white',
            style.appearingBlock,
            !openClass && style.close,
            left ? 'left-0' : 'right-0',
          )}
        >
          {children}
        </div>
      )}
      <button className="relative block" onClick={toggle}>
        {button}
      </button>
    </div>
  )
}
