import React from 'react'
import cn from 'classnames'
import fileIcon from 'assets/images/icons/file.png'

type Props = {
  file: string
  className?: string
}

export default function File({ file, className }: Props) {
  const parts = file.split('/')
  const name = parts[parts.length - 1]

  return (
    <a
      href={file}
      download
      className={cn('flex-center flex-col py-2', className)}
    >
      <img src={fileIcon} alt="file" />
      <div className="mt-2 text-gray-97">{name}</div>
    </a>
  )
}
