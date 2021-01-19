import React from 'react'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import ErrorMessage from 'Shared/Form/ErrorMessage'
import FormGroup from 'Class/Form/FormGroup'
import Description from 'Class/Form/Description'
import UploadCover from 'Class/Form/UploadCover'
import Toggle from 'Class/Form/Toggle'
import { useMutation } from 'react-query'
import api from 'api'
import Loader from 'Shared/Loader'

const maxLength = 200

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().max(maxLength),
  image: yup.object().required(),
  isPublic: yup.boolean().required(),
  autoApprove: yup.boolean().required(),
})

type Props = {
  onClose(): void
}

const defaultValues = {
  name: '',
  description: '',
  image: undefined as { blob: Blob; url: string } | undefined,
  isPublic: false,
  autoApprove: false,
}

export default function ClassForm({ onClose }: Props) {
  const form = useForm({ schema, defaultValues })

  const [save, { isLoading }] = useMutation(api.classes.create)

  const submit = () => {
    if (isLoading) return

    const values = form.getValues()
    save({
      name: values.name,
      description: values.description,
      isPublic: values.isPublic,
      autoApprove: values.autoApprove,
      image: values.image as { blob: Blob },
      isLocked: false,
    })
  }

  return (
    <Modal width={840}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="mt-8 mb-7 uppercase text-center text-2xl relative">
          <button onClick={onClose}>
            <X size={32} className="absolute top-0 right-0 mr-7 text-gray-5f" />
          </button>
          Create Class
        </div>
        <FormGroup label="Name of Class">
          <input
            ref={form.register}
            name="name"
            className="rounded border border-gray-8b text-gray-6b px-4 w-full h-10"
            placeholder="Enter your class name"
          />
          <ErrorMessage form={form} name="name" />
        </FormGroup>
        <FormGroup label="Description">
          <Description form={form} maxLength={maxLength} />
        </FormGroup>
        <FormGroup label="Cover Photo">
          <UploadCover form={form} />
        </FormGroup>
        <FormGroup label="Privacy Option">
          <Toggle
            form={form}
            name="isPublic"
            options={{ Public: true, Private: false }}
          >
            Public
            <br />
            Anyone can find this class. It is searchable.
            <div className="h-4"></div>
            Private
            <br />
            This class is hidden from public view. It is not searchable. Only
            members can see the posts of this class. To have new members, you
            must invite them to join your class.
          </Toggle>
        </FormGroup>
        <FormGroup label="Approval of Requests">
          <Toggle
            form={form}
            name="autoApprove"
            options={{ Automatically: true, Manual: false }}
          >
            If you choose Automatically, requests to join this class are
            approved automatically. If you choose Manually, you have to approve
            each request manually.
          </Toggle>
        </FormGroup>
        <button
          className="ml-64 mt-10 mb-12 w-400px rounded-full bg-blue-primary text-white font-bold flex-center h-10"
          disabled={isLoading}
        >
          {isLoading && <Loader className="w-5 h-5" />}
          {!isLoading && 'Create'}
        </button>
      </form>
    </Modal>
  )
}
