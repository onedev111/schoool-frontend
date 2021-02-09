import React from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  contentClass?: string
  children: React.ReactNode
}

const offsetTop = 32

// custom code for facebook-like sidebar because ready solutions didn't work and doesn't have ts support

export default function Sidebar({ className, contentClass, children }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const helperRef = React.useRef<HTMLDivElement>(null)
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    let prev = document.body.scrollTop || document.documentElement.scrollTop
    let direction = 'up' as 'down' | 'up'

    const onScroll = () => {
      const scroll =
        document.body.scrollTop || document.documentElement.scrollTop

      const container = containerRef.current
      const sidebar = sidebarRef.current
      const helper = helperRef.current
      if (container && sidebar && helper) {
        const fullHeight = document.body.offsetHeight
        const sidebarRect = sidebar.getBoundingClientRect()
        const sidebarHeight = sidebarRect.height

        if (scroll > prev && direction !== 'down') {
          direction = 'down'
          sidebar.style.top = `${Math.min(
            fullHeight - sidebarHeight - offsetTop,
            0,
          )}px`
          sidebar.style.bottom = 'auto'
          helper.style.height = '0px'
        } else if (
          scroll < prev &&
          direction !== 'up' &&
          sidebarHeight > fullHeight
        ) {
          direction = 'up'

          helper.style.height = `${Math.max(
            sidebarRect.top - container.getBoundingClientRect().top - offsetTop,
            0,
          )}px`

          sidebar.style.top = 'auto'
          sidebar.style.bottom = `-${
            sidebar.offsetHeight - fullHeight + offsetTop
          }px`
        }
      }

      prev = scroll
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('pt-8 pb-8 w-full h-full', className)}
      style={{ maxWidth: '420px' }}
    >
      <div ref={helperRef} />
      <div
        ref={sidebarRef}
        className={cn('flex flex-col w-full sticky', contentClass)}
      >
        {children}
      </div>
    </div>
  )
}
