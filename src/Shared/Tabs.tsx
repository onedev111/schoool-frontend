import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

type Props = {
  tabs: {
    label: string
    value: string
    link?: string
    onClick?(): void
  }[]
  activeTab: string
  className?: string
}

const ButtonOrLink = ({
  link,
  onClick,
  className,
  children,
}: {
  link?: string
  onClick?(): void
  className: string
  children: React.ReactNode
}) =>
  link ? (
    <Link to={link} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )

export default function Tabs({ className, tabs, activeTab }: Props) {
  return (
    <div className={cn('flex bg-white', className)} style={{ height: '50px' }}>
      {tabs.map((tab) => (
        <ButtonOrLink
          key={tab.value}
          link={tab.link}
          onClick={tab.onClick}
          className={cn(
            'w-full h-full flex-center uppercase text-17 border-b',
            tab.value === activeTab
              ? 'border-black text-black'
              : 'border-gray-87 text-gray-87',
          )}
        >
          {tab.label}
        </ButtonOrLink>
      ))}
    </div>
  )
}
