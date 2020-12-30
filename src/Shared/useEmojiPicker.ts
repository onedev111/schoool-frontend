import React from 'react'
import { EmojiButton } from '@joeattardi/emoji-button'

type Props = {
  editorRef: { current: HTMLElement | null }
}

export default function useEmojiPicker({ editorRef }: Props) {
  const [emojiPicker] = React.useState(() => {
    const picker = new EmojiButton() as EmojiButton & {
      selection: { start: number; end: number }
    }
    picker.selection = {
      start: 0,
      end: 0,
    }
    picker.on('emoji', ({ emoji }) => {
      const area = (editorRef.current as unknown) as HTMLTextAreaElement
      const { value } = area
      const { selection } = picker
      area.value =
        value.slice(0, selection.start) + emoji + value.slice(selection.end)

      const event = new Event('change')
      area.dispatchEvent(event)
    })
    return picker
  })

  React.useEffect(() => {
    const listener = () => {
      if (!editorRef.current) return

      const area = (editorRef.current as unknown) as HTMLTextAreaElement
      emojiPicker.selection = {
        start: area.selectionStart,
        end: area.selectionEnd,
      }
    }
    document.addEventListener('selectionchange', listener)
    return () => document.removeEventListener('selectionchange', listener)
  }, [])

  return (e: React.MouseEvent<HTMLElement>) =>
    emojiPicker.togglePicker(e.target as HTMLElement)
}
