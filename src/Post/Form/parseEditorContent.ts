import { Tag, TagType } from 'Post/types'

export default function parseEditorContent({
  editor,
}: {
  editor: HTMLDivElement
}) {
  const text = editor.textContent || ''

  const mark = String(Math.random()).slice(2)

  const div = editor.cloneNode(true) as HTMLDivElement
  const tagElements: HTMLElement[] = Array.from(
    div.querySelectorAll('[data-tag-id]'),
  )
  tagElements.forEach((tag) => {
    tag.innerText = `${mark}${JSON.stringify({
      id: parseInt(tag.dataset.tagId || '0'),
      type: tag.dataset.tagType,
      name: tag.textContent,
    })}${mark}`
  })

  const tags: Tag[] = []

  let position = 0
  ;(div.textContent || '').split(mark).forEach((text, i) => {
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
