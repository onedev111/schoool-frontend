import React from 'react'
import cn from 'classnames'
import style from './style.module.css'

type Props = {
  className?: string
}

export default function Loader({ className }: Props) {
  return (
    <div className={cn(style.wrap, className)}>
      <div className={style.loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
