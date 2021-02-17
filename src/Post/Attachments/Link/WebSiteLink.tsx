import React from 'react'
import Link from 'Post/Attachments/Link/index'
import { useLinkPreview } from 'utils/linkPreview'

type Props = {
  link: string
  className?: string
  onDelete?(): void
}

export default function WebSiteLink({ link, className, onDelete }: Props) {
  const preview = useLinkPreview({ link })

  return (
    <Link className={className} url={link} text={link} onDelete={onDelete} />
  )
}
