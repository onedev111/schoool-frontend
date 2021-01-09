import React from 'react'
import { EmojiButton } from '@joeattardi/emoji-button'
import { insertElementToContentEditable } from 'utils/contentEditable'

type Props = {
  state: {
    selectionRange?: Range
    editorRef: { current: HTMLElement | HTMLTextAreaElement | null }
  }
  onChange?(): void
}

export default function useEmojiPicker({ state, onChange }: Props) {
  const [emojiPicker] = React.useState(() => {
    const picker = new EmojiButton()
    picker.on('emoji', ({ emoji }) => {
      const editor = state.editorRef.current
      if (!editor) return

      if ('value' in editor) {
        const { value } = editor
        const { selectionRange } = state
        if (selectionRange)
          editor.value =
            value.slice(0, selectionRange.startOffset) +
            emoji +
            value.slice(selectionRange.endOffset)

        const event = new Event('change')
        editor.dispatchEvent(event)
      } else {
        const textNode = document.createTextNode(emoji)
        insertElementToContentEditable(textNode, editor, state.selectionRange)
      }

      if (onChange) onChange()
    })
    return picker
  })

  return (e: React.MouseEvent<HTMLElement>) =>
    emojiPicker.togglePicker(e.target as HTMLElement)
}
