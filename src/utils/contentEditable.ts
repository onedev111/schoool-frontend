import React from 'react'

export const useOnChangeSelectionRange = (onChange: (range: Range) => void) => {
  React.useEffect(() => {
    const listener = () => {
      const selection = window.getSelection()
      const range =
        selection && selection.rangeCount > 0
          ? selection.getRangeAt(0)
          : undefined
      const parent = range?.endContainer.parentElement
      if (range && parent && parent.closest('.js-editor')) onChange(range)
    }

    document.addEventListener('selectionchange', listener)

    return () => document.removeEventListener('selectionchange', listener)
  }, [])
}

export const insertElementToContentEditable = (
  element: HTMLElement | Text,
  editor: HTMLElement,
  range?: Range,
) => {
  if (range) {
    const { endContainer, startOffset, endOffset } = range
    if (endContainer.nodeType === 3) {
      const parent = endContainer.parentNode as HTMLElement
      const textNode = endContainer as HTMLElement
      const text = textNode.textContent || ''
      parent.insertBefore(
        document.createTextNode(text.slice(0, startOffset)),
        textNode,
      )
      parent.insertBefore(element, textNode)
      parent.insertBefore(
        document.createTextNode(text.slice(endOffset)),
        textNode,
      )
      parent.removeChild(textNode)
    } else if (endContainer?.nodeType === 1) {
      ;(endContainer as HTMLElement).appendChild(element)
    }
  } else {
    editor.appendChild(element)
  }
}

export const focusAtTheEnd = (el: HTMLElement) => {
  el.focus()
  if (window.getSelection && document.createRange) {
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(range)
    }
  } else if ('createTextRange' in document.body) {
    // eslint-disable-next-line
    const textRange = (document.body as any).createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}
