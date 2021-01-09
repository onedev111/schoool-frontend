import React from 'react'
import { Link as LinkType } from 'Post/types'
import postLinkImage from 'assets/images/post-link.svg'
import studyflowImage from 'assets/images/icons/studyflow.svg'
import cn from 'classnames'
import ZoomIcon from 'assets/images/icons/Zoom'
import { X } from '@styled-icons/boxicons-regular/X'

type Props = {
  link: LinkType
  className?: string
  onDelete?(): void
}

const LinkComponent = ({
  link,
  ...props
}: {
  link: LinkType
  className?: string
  children: React.ReactNode
}) => {
  if (link.type === 'link')
    return <a href={link.text} target="_blank" {...props} />
  else return <div {...props} />
}

export default function Link({ link, className, onDelete }: Props) {
  let image: string | undefined
  if (link.type === 'link') image = link.image
  else if (link.type === 'post') image = postLinkImage
  else if (link.type === 'studyflow') image = studyflowImage

  return (
    <div className={cn('bg-gray-f7 p-3 flex relative', className)}>
      <div className="flex-shrink-0 mr-3">
        {image && (
          <img
            src={image}
            alt="link"
            style={{ width: '70px', height: '70px' }}
          />
        )}
        {link.type === 'zoom' && <ZoomIcon size={74} />}
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <LinkComponent link={link} className="font-bold">
          {link.type === 'zoom' && 'Go to the zoom meeting'}
          {'title' in link && link.title}
        </LinkComponent>
        {link.type !== 'zoom' && (
          <LinkComponent
            link={link}
            className="font-bold text-sm text-gray-71 mt-2"
          >
            {link.text}
          </LinkComponent>
        )}
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute right-0 bottom-0 p-2 text-gray-6b"
        >
          <X size={32} />
        </button>
      )}
    </div>
  )
}
