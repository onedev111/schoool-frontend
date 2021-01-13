import { Tag, TagType } from 'Post/types'

export const getTextAndTagsParts = (post: { text: string; tags: Tag[] }) => {
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

  return { parts, partsTags, text: post.text }
}

export const getTextAndTagsFromEditor = ({
  editor,
}: {
  editor: HTMLDivElement
}) => {
  const text = editor.innerText || ''

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
  ;(div.innerText || '').split(mark).forEach((text, i) => {
    if (i % 2 === 0) {
      position += text.length
      return
    }

    const tag: {
      id: number
      type: TagType
      name: string
    } = JSON.parse(text)

    const length = tag.name.length

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

export const getTaggedEditorHTML = (post?: { text: string; tags: Tag[] }) => {
  if (!post) return ''

  const { parts, partsTags } = getTextAndTagsParts(post)
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
