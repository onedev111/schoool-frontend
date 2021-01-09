import React from 'react'
import { Camera } from '@styled-icons/boxicons-regular/Camera'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'
import { Smile } from '@styled-icons/fa-regular'
import { useForm } from 'Shared/Form'
import * as yup from 'yup'
import { UseFormMethods } from 'react-hook-form'
import Textarea from 'Shared/Form/Textarea'
import { X } from '@styled-icons/boxicons-regular/X'
import useEmojiPicker from 'utils/useEmojiPicker'
import useImageUploadState from 'utils/imageUploadState'
import { useOnChangeSelectionRange } from 'utils/contentEditable'

const schema = yup.object({
  text: yup.string().min(5).required(),
})

type Props = {
  className?: string
  rows?: number
}

export default observer(function CommentForm({ className, rows = 1 }: Props) {
  const form = useForm({
    schema,
    mode: 'onChange',
    defaultValues: { text: '' },
  })

  const imageUploadState = useImageUploadState()

  const editorRef = React.useRef<HTMLTextAreaElement>(null)
  const [state] = React.useState(() => ({
    editorRef,
    selectionRange: undefined as Range | undefined,
  }))

  useOnChangeSelectionRange((range) => (state.selectionRange = range))

  const toggleEmoji = useEmojiPicker({ state })

  const submit = (values: { text: string }) => {
    console.log(values)
  }

  return (
    <>
      <form
        className={cn('relative', className)}
        onSubmit={form.handleSubmit(submit)}
      >
        {imageUploadState.warningModal}
        {imageUploadState.dragArea}
        <div className="flex-grow">
          <Textarea
            classes={{
              root: 'mb-2',
              input:
                'resize-none focus:outline-none placeholder-gray-6b w-full js-editor',
              error: 'text-red-600',
            }}
            form={form}
            name="text"
            elementRef={editorRef}
            rows={rows}
            placeholder="Write a comment"
            errorOnlyForSubmitted
          />
          {imageUploadState.images.map((image, i) => {
            if (!image.link) return <React.Fragment key={i} />

            return (
              <div
                style={{ minWidth: '30px', minHeight: '30px' }}
                className="mb-4 mr-4 inline-block relative group shadow"
              >
                <button
                  type="button"
                  className="w-5 h-5 flex-center text-white absolute top-0 right-0 mt-2 mr-2"
                  style={{ background: 'rgba(0, 0, 0, .3)' }}
                  onClick={() => imageUploadState.removeImage(image)}
                >
                  <X size={20} />
                </button>
                <img
                  src={image.link}
                  alt="image link"
                  style={{ maxHeight: '72px' }}
                />
              </div>
            )
          })}
          <div className="flex items-center">
            <label>
              <Camera
                className="text-gray-a4 cursor-pointer transition duration-200 hover:text-blue-primary"
                size={25}
              />
              <input
                hidden
                type="file"
                onChange={(e) => imageUploadState.onChangeImage(e)}
                accept="image/*"
              />
            </label>
            <button
              type="button"
              className="flex-center ml-2"
              onClick={toggleEmoji}
            >
              <Smile className="text-gray-a4" size={20} />
            </button>
          </div>
        </div>
        <SubmitButton form={form} />
      </form>
    </>
  )
})

function SubmitButton({ form }: { form: UseFormMethods<any> }) {
  const { isDirty, isValid } = form.formState

  return (
    <button
      className={cn(
        'text-blue-primary text-lg',
        (!isDirty || !isValid) && 'opacity-25',
      )}
    >
      Post
    </button>
  )
}
