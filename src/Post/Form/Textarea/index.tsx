import React from 'react'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

const TextArea = React.memo(
  ({
    state,
    onFocus,
    onBlur,
  }: {
    state: State
    onFocus(): void
    onBlur(): void
  }) => {
    return (
      <div
        ref={state.editorRef}
        contentEditable
        className="focus:outline-none w-full js-editor h-40"
        onFocus={onFocus}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: state.values.html }}
        onInput={(e) => {
          console.log('onInput')
          state.setHTML((e.target as HTMLElement).innerHTML)
        }}
      />
    )
  },
)

export default observer(function FormTextarea({ state }: Props) {
  const [focused, setFocused] = React.useState(false)

  const onFocus = React.useCallback(() => {
    setFocused(true)
  }, [])

  const onBlur = React.useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <div className="mt-7 mb-4 text-lg block relative">
      {!focused && state.values.html.length === 0 && (
        <div className="text-gray-6b pointer-events-none absolute top-0 left-0">
          Post anything about English learning.
        </div>
      )}
      <TextArea state={state} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
})
