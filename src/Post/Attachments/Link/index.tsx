import React from 'react'
// import studyflowImage from 'assets/images/icons/studyflow.svg'
import cn from 'classnames'
import { X } from '@styled-icons/boxicons-regular/X'
import style from 'Post/Attachments/Link/style.module.css'

type Props = {
  className?: string
  url?: string
  onClick?(): void
  image?: React.ReactNode
  title?: string
  text?: string
  onDelete?(): void
  style?: React.CSSProperties
}

const LinkComponent = ({
  url,
  ...props
}: {
  url?: string
  onClick?(): void
  className?: string
  children: React.ReactNode
}) => {
  if (url) return <a href={url} target="_blank" {...props} />
  else return <button type="button" {...props} />
}

export default function Link({
  className,
  url,
  onClick,
  image,
  title,
  text,
  onDelete,
}: Props) {
  return (
    <LinkComponent
      url={url}
      onClick={onClick}
      className={cn(
        'bg-gray-f7 py-2 px-3 flex items-center relative text-left',
        className,
      )}
    >
      {image && <div className="flex-shrink-0 mr-3">{image}</div>}
      <div className="h-full flex-grow flex flex-col justify-center">
        {title && <div className={style.title}>{title}</div>}
        {text && (
          <div className="font-bold text-sm text-gray-71 mt-1 whitespace-per-wrap">
            {text}
          </div>
        )}
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onDelete()
          }}
          className="absolute right-0 bottom-0 p-2 text-gray-6b"
        >
          <X size={32} />
        </button>
      )}
    </LinkComponent>
  )
}
