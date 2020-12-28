import React from 'react'
import { Camera } from '@styled-icons/boxicons-regular/Camera'
import { CloseCircle } from '@styled-icons/ionicons-solid/CloseCircle'
import dragOverState from 'Shared/dragOverState'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'
import { Smile } from '@styled-icons/fa-regular'
import { EmojiButton } from '@joeattardi/emoji-button'
import Editor from './Editor'
import { useForm } from 'Shared/Form'
import * as yup from 'yup'
import { UseFormMethods, useWatch } from 'react-hook-form'

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

  const [filePreview, setFilePreview] = React.useState<string | null>(null)
  const [dragOver, setDragOver] = React.useState(false)
  const editorRef = React.useRef(null)
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

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setFilePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const {
      dataTransfer: { items, files },
    } = e
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          handleFile(items[i].getAsFile() as File)
          break
        }
      }
    } else {
      handleFile(files[0])
    }
  }

  React.useEffect(() => {
    const listener = () => {
      const area = (editorRef.current as unknown) as HTMLTextAreaElement
      emojiPicker.selection = {
        start: area.selectionStart,
        end: area.selectionEnd,
      }
    }
    document.addEventListener('selectionchange', listener)
    return () => document.removeEventListener('selectionchange', listener)
  }, [])

  const submit = (values: { text: string }) => {
    console.log(values)
  }

  return (
    <>
      <form
        className={cn('relative', className)}
        onSubmit={form.handleSubmit(submit)}
      >
        {dragOverState.hasFiles && (
          <div
            className={cn(
              'absolute-fill flex-center text-xl b border-4 border-dashed',
              dragOver
                ? 'text-blue-primary border-blue-primary'
                : 'text-gray-8b border-gray-c5',
            )}
            style={{ background: 'rgba(255, 255, 255, .5)' }}
            onDragOver={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            Drag file here
          </div>
        )}
        <div className="flex-grow">
          <Editor form={form} name="text" rows={rows} editorRef={editorRef} />
          {filePreview && (
            <div
              style={{ minWidth: '30px', minHeight: '30px' }}
              className="mb-4 inline-block relative group"
            >
              <button
                className="absolute top-0 right-0 mt-1 mr-1 text-white hover:text-blue-primary h-4 opacity-0 transition duration-200 group-hover:opacity-100"
                style={{ lineHeight: 0 }}
                onClick={() => setFilePreview(null)}
              >
                <CloseCircle size={16} />
              </button>
              <img
                src={filePreview}
                alt="image preview"
                style={{ maxHeight: '72px' }}
              />
            </div>
          )}
          <div className="flex items-center">
            <label>
              <Camera
                className="text-gray-a4 cursor-pointer transition duration-200 hover:text-blue-primary"
                size={25}
              />
              <input
                hidden
                type="file"
                onChange={(e) => {
                  handleFile(
                    ((e.target as unknown) as { files: File[] }).files[0],
                  )
                  ;((e.target as unknown) as { value: File[] }).value = []
                }}
                accept="image/*"
              />
            </label>
            <button
              type="button"
              className="flex-center ml-2"
              onClick={(e) => emojiPicker.togglePicker(e.target as HTMLElement)}
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
