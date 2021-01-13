import { Tag, TagType, TagWithReply } from 'Post/types'
import { InReplyTo } from 'Post/Comment/types'

export const getTextAndTagsParts = ({
  text,
  tags = [],
  inReplyTo,
}: {
  text: string
  tags?: Tag[]
  inReplyTo?: InReplyTo
}) => {
  const repliedUser = inReplyTo?.user
  const parts = repliedUser ? [repliedUser.name, ` ${text}`] : [text]
  const partsTags: (TagWithReply | null)[] = repliedUser
    ? [
        {
          id: repliedUser.id,
          type: 'reply',
          start: 0,
          length: repliedUser.name.length,
        },
        null,
      ]
    : [null]

  tags.forEach((tag) => {
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

  return { parts, partsTags, text }
}

export const getTextAndTagsFromEditor = ({
  editor,
}: {
  editor: HTMLDivElement
}) => {
  let text = editor.innerText || ''

  const mark = String(Math.random()).slice(2)

  const div = editor.cloneNode(true) as HTMLDivElement
  const tagElements: HTMLElement[] = Array.from(
    div.querySelectorAll('[data-tag-id]'),
  )
  tagElements.forEach((tag) => {
    tag.innerText = `${mark}${JSON.stringify({
      id: parseInt(tag.dataset.tagId || '0'),
      type: tag.dataset.tagType,
      name: tag.innerText,
    })}${mark}`
  })

  const tags: Tag[] = []

  let position = 0
  let containsRepliedUserName = false

  ;(div.innerText || '').split(mark).forEach((partText, i) => {
    if (i % 2 === 0) {
      position += partText.length
      return
    }

    const tag: {
      id: number
      type: TagType | 'reply'
      name: string
    } = JSON.parse(partText)

    const length = tag.name.length

    if (tag.type === 'reply') {
      containsRepliedUserName = true
      text = text.slice(0, position) + text.slice(position + length).trimLeft()
      return
    }

    tags.push({
      id: tag.id,
      type: tag.type,
      start: position,
      length,
    })

    position += length
  })

  return {
    text,
    tags,
    containsRepliedUserName,
  }
}

const tagClassName = 'text-blue-primary pointer-events-none'

export const createTagElement = (tag: {
  name: string
  id: number
  type: TagType
}) => {
  const link = document.createElement('span')
  link.setAttribute('contenteditable', 'false')
  link.className = tagClassName
  link.innerText = tag.name
  link.setAttribute('data-tag-id', String(tag.id))
  link.setAttribute('data-tag-type', tag.type)
  return link
}

export const getTaggedEditorHTML = ({
  text = '',
  tags = [],
  inReplyTo,
}: { text?: string; tags?: Tag[]; inReplyTo?: InReplyTo } = {}) => {
  const { parts, partsTags } = getTextAndTagsParts({ text, tags, inReplyTo })
  return parts
    .map((part, index) => {
      const tag = partsTags[index]
      if (tag)
        return (
          `<span` +
          ` class='${tagClassName}'` +
          ` data-tag-id='${tag.id}'` +
          ` data-tag-type='${tag.type}'` +
          ` contenteditable="false"` +
          `>${part}</span>`
        )
      else return part
    })
    .join('')
}
