import React from 'react'
import { observer } from 'mobx-react-lite'

type EditorRef = { current: HTMLDivElement | null }

const ContentEditableDiv = React.memo(
  ({
    editorRef,
    minHeight,
    getValue,
    setValue,
    onFocus,
    onBlur,
  }: {
    editorRef: EditorRef
    minHeight: number
    getValue(): string
    setValue(value: string): void
    onFocus(): void
    onBlur(): void
  }) => (
    <div
      ref={editorRef}
      contentEditable
      className="focus:outline-none w-full js-editor whitespace-pre-wrap"
      style={{ minHeight: `${minHeight}px` }}
      onFocus={onFocus}
      onBlur={onBlur}
      dangerouslySetInnerHTML={{ __html: getValue() }}
      onInput={(e) => {
        setValue((e.target as HTMLElement).innerHTML)
      }}
      onPaste={(e: any) => {
        e.preventDefault()
        const text = (e.originalEvent || e).clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
        setValue((e.target as HTMLElement).innerHTML)
      }}
    />
  ),
)

type Props = {
  placeholder: string
  minHeight?: number
  editorRef: EditorRef
  getValue(): string
  setValue(value: string): void
}

export default observer(function ContentEditable({
  placeholder,
  minHeight = 170,
  editorRef,
  getValue,
  setValue,
}: Props) {
  const [focused, setFocused] = React.useState(false)

  const onFocus = React.useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = React.useCallback(() => {
    setFocused(false)
  }, [])

  const fixedGetValue = React.useCallback(getValue, [])
  const fixedSetValue = React.useCallback(setValue, [])

  return (
    <div className="relative">
      {!focused && getValue().length === 0 && (
        <div className="text-gray-6b pointer-events-none absolute top-0 left-0">
          {placeholder}
        </div>
      )}
      <ContentEditableDiv
        getValue={fixedGetValue}
        setValue={fixedSetValue}
        editorRef={editorRef}
        onFocus={onFocus}
        onBlur={onBlur}
        minHeight={minHeight}
      />
    </div>
  )
})
