import React from 'react'
import { useForm } from 'Shared/Form'
import * as yup from 'yup'
import Textarea from 'Shared/Form/Textarea'
import { NotebookSentence } from 'Post/types'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import Loader from 'Shared/Loader'

type Props = {
  backButton?: boolean
  title: string
  buttonText: string
  sentence?: NotebookSentence | null
  className?: string
  titleClass?: string
  contentClass: string
  buttonWrapClass: string
  onClose(): void
  onSubmit(sentence: NotebookSentence): void
}

const maxLength = 250

const schema = yup.object({
  text: yup.string().label('english sentence').max(maxLength).required(),
  translation: yup.string().label('translation').max(maxLength).required(),
})

export default function SentenceForm({
  className,
  titleClass,
  backButton = false,
  title,
  buttonText,
  sentence,
  onClose,
  onSubmit,
  contentClass,
  buttonWrapClass,
}: Props) {
  const form = useForm({
    schema,
    mode: 'onChange',
    defaultValues: sentence || { text: '', translation: '' },
  })

  const [error, setError] = React.useState<Error | undefined>()
  const [isLoading, setLoading] = React.useState(false)

  const submit = async (values: NotebookSentence) => {
    if (isLoading) return
    setLoading(true)
    try {
      await onSubmit(values)
      setError(undefined)
      onClose()
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className={className}>
      {backButton && (
        <button
          type="button"
          className="absolute top-0 left-0 text-gray-5f mt-8 ml-6"
          onClick={onClose}
        >
          <ArrowLeft size={26} />
        </button>
      )}
      <div className={titleClass || 'text-xl text-center uppercase pt-6 pb-4'}>
        {title}
      </div>
      <hr className="text-gray-c5" />
      {error && (
        <div className="text-red-500 text-center mb-2">{error.message}</div>
      )}
      <div className={contentClass}>
        <Textarea
          className="mb-6 flex flex-col"
          counter
          maxLength={250}
          form={form}
          name="text"
          label="English sentence"
          placeholder="Add english sentence"
        />
        <Textarea
          className="flex flex-col"
          counter
          maxLength={250}
          form={form}
          name="translation"
          label="Translation in your native language"
          placeholder="Add translation in your native language"
        />
        <div className={buttonWrapClass}>
          <button
            className="rounded-full bg-blue-primary text-white h-8 px-7 font-bold cursor-pointer flex-center"
            disabled={isLoading}
          >
            {isLoading && <Loader className="w-5 h-5" />}
            {!isLoading && buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}
