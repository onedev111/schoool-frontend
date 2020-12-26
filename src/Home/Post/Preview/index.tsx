import React from 'react'
import { Preview as PreviewType } from 'Home/Post/types'
import postLinkImage from 'assets/images/post-link.svg'
import studyflowImage from 'assets/images/icons/studyflow.svg'
import cn from 'classnames'
import style from './style.module.css'

type Props = {
  preview: PreviewType
  className?: string
}

const LinkComponent = ({
  preview,
  ...props
}: {
  preview: PreviewType
  className?: string
  children: React.ReactNode
}) => {
  if (preview.type === 'link')
    return <a href={preview.text} target="_blank" {...props} />
  else return <div {...props} />
}

export default function Preview({ preview, className }: Props) {
  return (
    <div className={cn('bg-gray-f7 p-3 flex', className)}>
      <div className="flex-shrink-0 mr-3">
        <img
          src={
            preview.type === 'link'
              ? preview.image
              : preview.type === 'post'
              ? postLinkImage
              : studyflowImage
          }
          alt="preview"
          style={{ width: '70px', height: '70px' }}
        />
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <LinkComponent
          preview={preview}
          className={cn('font-bold', style.title)}
        >
          {preview.title}
        </LinkComponent>
        <LinkComponent
          preview={preview}
          className="font-bold text-sm text-gray-71"
        >
          {preview.text}
        </LinkComponent>
      </div>
    </div>
  )
}
