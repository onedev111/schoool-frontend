import React from 'react'
import { observer } from 'mobx-react-lite'
import { focusAtTheEnd } from 'utils/contentEditable'

type EditorRef = { current: HTMLDivElement | null }

const ContentEditableDiv = React.memo(
  ({
    editorRef,
    minHeight,
    getValue,
    setValue,
    autoFocus,
    onFocus,
    onBlur,
    openTag,
  }: {
    editorRef: EditorRef
    minHeight: number
    autoFocus?: boolean
    getValue(): string
    setValue(value: string): void
    onFocus(): void
    onBlur(): void
    openTag?(): void
  }) => {
    React.useEffect(() => {
      if (autoFocus && editorRef.current) focusAtTheEnd(editorRef.current)
    }, [])

    return (
      <div
        ref={editorRef}
        contentEditable
        className="focus:outline-none w-full js-editor whitespace-pre-wrap"
        style={{ minHeight: `${minHeight}px` }}
        onFocus={onFocus}
        onClick={onFocus}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: getValue() }}
        onInput={(e) => {
          setValue((e.target as HTMLElement).innerHTML)
        }}
        onKeyDown={(e) => {
          if (openTag && e.nativeEvent.key === '@') {
            e.preventDefault()
            openTag()
          }
        }}
        onPaste={(e) => {
          e.preventDefault()
          // eslint-disable-next-line
          const text = ((e as any).originalEvent || e).clipboardData.getData(
            'text/plain',
          )
          document.execCommand('insertHTML', false, text)
          setValue((editorRef.current as HTMLElement).innerHTML)
        }}
      />
    )
  },
)

type Props = {
  placeholder: string
  minHeight?: number
  editorRef: EditorRef
  autoFocus?: boolean
  openTag?(): void
  getValue(): string
  setValue(value: string): void
}

export default observer(function ContentEditable({
  placeholder,
  minHeight = 170,
  editorRef,
  getValue,
  setValue,
  autoFocus,
  openTag,
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
  const fixedOpenTag = React.useMemo(() => openTag, [])

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
        autoFocus={autoFocus}
        openTag={fixedOpenTag}
      />
    </div>
  )
})
