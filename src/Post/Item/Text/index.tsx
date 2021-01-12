import React from 'react'
import { Post, Tag } from 'Post/types'
import cn from 'classnames'
import style from 'Home/style.module.css'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { observer } from 'mobx-react-lite'
import { getTextAndTagsParts } from 'utils/tags'

type Props = {
  post: Post
  textRef: { current: null | HTMLDivElement }
  showFullText: boolean
}

export default observer(function Text({ post, textRef, showFullText }: Props) {
  const [{ parts, partsTags, text }, setTextParts] = React.useState(() =>
    getTextAndTagsParts(post),
  )

  React.useEffect(() => {
    if (post.text !== text) setTextParts(getTextAndTagsParts(post))
  }, [post.text, post.tags])

  return (
    <div
      ref={textRef}
      className={cn(
        `text-gray-02 mb-3 whitespace-pre-wrap`,
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
              type === 'user'
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
