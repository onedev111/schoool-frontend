import React from 'react'
import Link from 'Post/Attachments/Link/index'
import ZoomIcon from 'assets/images/icons/Zoom'

type Props = {
  zoomLink: string
  className?: string
  onDelete?(): void
}

export default function ZoomLink({ zoomLink, className, onDelete }: Props) {
  return (
    <Link
      className={className}
      url={zoomLink}
      image={<ZoomIcon size={70} />}
      title="Go to the zoom meeting"
      onDelete={onDelete}
    />
  )
}
