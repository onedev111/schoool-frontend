import React from 'react'
import { Tag } from 'Post/types'
import cn from 'classnames'
import style from 'Home/style.module.css'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { observer } from 'mobx-react-lite'
import { getTextAndTagsParts } from 'utils/tags'
import { InReplyTo } from 'Post/Comment/types'

type Props = {
  data: { text: string; tags?: Tag[]; inReplyTo?: InReplyTo }
  textRef?: { current: null | HTMLDivElement }
  showFullText?: boolean
  className?: string
}

export default observer(function Text({
  data,
  textRef,
  showFullText = true,
  className,
}: Props) {
  const [{ parts, partsTags, text }, setTextParts] = React.useState(() =>
    getTextAndTagsParts(data),
  )

  React.useEffect(() => {
    if (data.text !== text) setTextParts(getTextAndTagsParts(data))
  }, [data.text, data.tags, data.inReplyTo])

  return (
    <div
      ref={textRef}
      className={cn(
        `whitespace-pre-wrap`,
        className,
        style.text,
        !showFullText && style.clampedText,
      )}
    >
      {parts.map((part, i) => {
        const tag = partsTags[i]
        if (!tag) return <React.Fragment key={i}>{part}</React.Fragment>

        const { type, id } = tag
        return (
          <Link
            key={i}
            to={
              type === 'user' || type === 'reply'
                ? routes.user(id)
                : type === 'class'
                ? routes.class(id)
                : routes.studyFlow(id)
            }
            className="text-blue-primary"
          >
            {part}
          </Link>
        )
      })}
    </div>
  )
})
