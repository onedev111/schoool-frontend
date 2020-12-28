import React from 'react'
import Modal from 'Shared/Modal'
import { useForm } from 'Shared/Form'
import * as yup from 'yup'
import Textarea from 'Shared/Form/Textarea'
import { Post } from 'Home/Post/types'
import NotebookMaxSentences from 'Shared/Modal/NotebookMaxSentences'

type Props = {
  post: Post
  onClose(): void
}

const maxLength = 250

const schema = yup.object({
  english: yup.string().label('english sentence').max(maxLength).required(),
  native: yup.string().label('translation').max(maxLength).required(),
})

export default function SavePost({ post, onClose }: Props) {
  const form = useForm({ schema, mode: 'onChange' })

  const submit = (values: any) => {
    console.log(values)
  }

  if (post.reachedNotebookLimit)
    return <NotebookMaxSentences onClose={onClose} />

  return (
    <Modal onClose={onClose} className="text-center" size="small">
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="text-xl uppercase pt-6 pb-4">Save to my notebook</div>
        <hr className="text-gray-c5" />
        <div className="pt-4 px-5 pb-5">
          <Textarea
            className="mb-6 flex flex-col"
            counter
            maxLength={250}
            form={form}
            name="english"
            label="English sentence"
            placeholder="Add english sentence"
          />
          <Textarea
            className="flex flex-col"
            counter
            maxLength={250}
            form={form}
            name="native"
            label="Translation in your native language"
            placeholder="Add translation in your native language"
          />
          <div className="flex-center mt-5">
            <input
              type="submit"
              className="rounded-full bg-blue-primary text-white h-8 px-7 font-bold"
              value="Save"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
