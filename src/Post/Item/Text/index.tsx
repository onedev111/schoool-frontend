import React from 'react'
import { Post, Tag } from 'Post/types'
import cn from 'classnames'
import style from 'Home/style.module.css'
import { Link } from 'react-router-dom'
import routes from 'routes'

type Props = {
  post: Post
  textRef: { current: null | HTMLDivElement }
  showFullText: boolean
}

export default function Text({ post, textRef, showFullText }: Props) {
  const [{ parts, partsTags }] = React.useState(() => {
    const parts: string[] = [post.text]
    const partsTags: (Tag | null)[] = [null]

    post.tags.forEach((tag) => {
      const { start, length } = tag
      let pos = 0
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const len = part.length
        if (pos + len < start) {
          pos += len
          continue
        }

        const from = start - pos
        const to = start + length - pos
        parts.splice(
          i,
          1,
          part.slice(0, from),
          part.slice(from, to),
          part.slice(to),
        )
        partsTags.splice(i, 1, partsTags[i], tag, partsTags[i])

        break
      }
    })

    return { parts, partsTags }
  })

  return (
    <div
      ref={textRef}
      className={cn(
        `text-gray-02 mb-3`,
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
}
