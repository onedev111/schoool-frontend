import React from 'react'
import Modal from 'Shared/Modal'
import { useForm } from 'Shared/Form'
import SelectRow from 'Shared/Form/SelectRow'

type Props = {
  onClose(): void
}

export default function SelectLevel({ onClose }: Props) {
  const form = useForm({ defaultValues: { level: 'Beginner' } })

  const submit = (values: any) => {
    onClose()
  }

  return (
    <Modal onClose={onClose} size="small" className="text-center">
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="text-xl uppercase pt-6 pb-4">Select english level</div>
        <hr className="text-gray-bb" />
        <div className="pt-7 px-5 pb-8">
          <SelectRow
            form={form}
            options={['Beginner', 'Intermediate', 'Advanced']}
            className="w-full mx-auto"
            style={{ maxWidth: '300px' }}
          />
          <div className="flex-center mt-8">
            <input
              type="submit"
              className="rounded-full bg-blue-primary text-white h-8 px-7 font-bold"
              value="Change"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
