import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import Textarea from 'Shared/Form/Textarea'

type Props = {
  form: UseFormMethods<any>
  editorRef: React.MutableRefObject<null>
  name: string
  rows: number
}

export default function Editor({ form, editorRef, name, rows }: Props) {
  return (
    <Textarea
      classes={{
        root: 'mb-2',
        input:
          'resize-none focus:outline-none placeholder-gray-6b w-full js-editor',
        error: 'text-red-600',
      }}
      form={form}
      name={name}
      elementRef={editorRef}
      rows={rows}
      placeholder="Write a comment"
      errorOnlyForSubmitted
    />
  )
}
