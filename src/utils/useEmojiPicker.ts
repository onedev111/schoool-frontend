import React from 'react'
import { EmojiButton } from '@joeattardi/emoji-button'
import { insertElementToContentEditable } from 'utils/contentEditable'

const closeButtonPlugin = {
  render(picker: EmojiButton) {
    const div = document.createElement('div')
    div.className = 'flex justify-end w-full pr-4'

    const button = document.createElement('button')
    button.type = 'button'
    button.innerHTML = '&times;'
    button.className = 'text-2xl'
    button.addEventListener('click', () => {
      picker.hidePicker()
    })

    div.appendChild(button)
    return div
  },
}

type Props = {
  state: {
    selectionRange?: Range
    editorRef: { current: HTMLElement | HTMLTextAreaElement | null }
  }
  onChange?(): void
}

export default function useEmojiPicker({ state, onChange }: Props) {
  const [emojiPicker] = React.useState(() => {
    const picker = new EmojiButton({
      plugins: [closeButtonPlugin],
    })
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
        editor.click()
      }

      if (onChange) onChange()
    })
    return picker
  })

  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        !el.closest('.emoji-picker__wrapper') &&
        !el.closest('.js-emoji-button')
      )
        emojiPicker.hidePicker()
    }

    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [])

  return (e: React.MouseEvent<HTMLElement>) =>
    emojiPicker.togglePicker(e.target as HTMLElement)
}
