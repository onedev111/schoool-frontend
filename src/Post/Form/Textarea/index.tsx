import React from 'react'
import { State } from 'Post/Form/State'
import ControlledTextarea from 'Shared/Form/ControlledTextarea'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

export default observer(function FormTextarea({ state }: Props) {
  return (
    <ControlledTextarea
      value={state.values.text}
      onChange={(e) => state.setText(e.target.value)}
      classes={{
        root: 'mt-7 mb-4 text-lg',
        input:
          'resize-none focus:outline-none placeholder-gray-6b w-full js-editor',
        error: 'text-red-600',
      }}
      name="text"
      elementRef={state.editorRef}
      rows={5}
      placeholder="Post anything about English learning."
    />
  )
})
