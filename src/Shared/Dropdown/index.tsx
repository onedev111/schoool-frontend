import React from 'react'
import cn from 'classnames'
import style from './style.module.css'

type DropdownProps = {
  children: React.ReactNode
  button: (params: { onClick(): void }) => React.ReactNode
  className?: string
  contentClass?: string
}

export default function Dropdown({
  button,
  children,
  className,
  contentClass,
}: DropdownProps) {
  const [isOpen, setOpen] = React.useState(false)
  const [openClass, setOpenClass] = React.useState(false)
  const [timeout, setTimeoutValue] = React.useState<number | undefined>(
    undefined,
  )
  const ref = React.useRef(null)

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
      const closest = (e.target as HTMLElement).closest('.js-dropdown')
      if (closest !== ref.current) close()
    }

    window.addEventListener('mousedown', listener)
    return () => window.removeEventListener('mousedown', listener)
  }, [isOpen])

  return (
    <div className={cn('js-dropdown', className)} ref={ref}>
      {isOpen && (
        <div
          className={cn(
            contentClass,
            style.appearingBlock,
            !openClass && style.close,
          )}
        >
          {children}
        </div>
      )}
      {button({ onClick: toggle })}
    </div>
  )
}
