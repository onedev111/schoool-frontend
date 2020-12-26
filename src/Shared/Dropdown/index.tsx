import React from 'react'
import cn from 'classnames'
import style from './style.module.css'

type DropdownProps = {
  children: React.ReactNode
  button: React.ReactNode
  className?: string
}

export default function Dropdown({
  button,
  children,
  className,
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
            'origin-top-right absolute right-0 mt-2 rounded-lg shadow bg-white',
            style.appearingBlock,
            !openClass && style.close,
          )}
        >
          {children}
        </div>
      )}
      <button className="relative" onClick={toggle}>
        {button}
      </button>
    </div>
  )
}
