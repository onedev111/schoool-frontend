import React from 'react'
import { Tag } from 'Post/types'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { observer } from 'mobx-react-lite'
import { getTextAndTagsParts } from 'utils/tags'
import { InReplyTo } from 'Post/Comment/types'
import style from 'Home/style.module.css'

const TextPart = React.memo(
  ({ text, highlightText }: { text: string; highlightText?: string }) => {
    return (
      <span>
        {!highlightText && text}
        {highlightText &&
          text.split(highlightText).map((part, i) => (
            <React.Fragment key={i}>
              {i !== 0 && (
                <span className="text-blue-primary">{highlightText}</span>
              )}
              {part}
            </React.Fragment>
          ))}
      </span>
    )
  },
)

type Props = {
  data: {
    text: string
    tags?: Tag[]
    inReplyTo?: InReplyTo
    images?: string[]
    video?: string
    youtubeId?: string
  }
  textRef?: { current: null | HTMLDivElement }
  showFullText?: boolean
  className?: string
  highlightText?: string
  children?: React.ReactNode
}

export default observer(function Text({
  data,
  textRef,
  showFullText = true,
  className,
  highlightText,
  children,
}: Props) {
  const [{ parts, partsTags, text }, setTextParts] = React.useState(() =>
    getTextAndTagsParts(data),
  )

  React.useEffect(() => {
    if (data.text !== text) setTextParts(getTextAndTagsParts(data))
  }, [data.text, data.tags, data.inReplyTo])

  const clampSize =
    data.images?.length || 0 > 0 || data.video || data.youtubeId
      ? style.clampedTextMedium
      : style.clampedTextLarge

  return (
    <div
      ref={textRef}
      className={cn(
        `whitespace-pre-wrap`,
        className,
        style.text,
        !showFullText && clampSize,
      )}
    >
      {children}
      {parts.map((part, i) => {
        const tag = partsTags[i]
        if (!tag || tag.type === 'studyflow')
          return <TextPart key={i} text={part} highlightText={highlightText} />

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
