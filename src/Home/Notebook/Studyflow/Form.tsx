import React from 'react'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import RadioGroup from 'Shared/Form/RadioGroup'
import Expressions from 'Home/Notebook/Studyflow/Expressions'
import useToggle from 'Shared/useToggle'
import DeleteModal from 'Shared/Modal/Delete'

type Props = {
  toggleMenu(): void
}

const schema = yup.object({
  title: yup.string().required(),
  level: yup.string().required(),
  privacy: yup.string().required(),
  expressions: yup.array(
    yup.object({
      questionEnglish: yup.string().label('Question in English').required(),
      questionNative: yup
        .string()
        .label('Question in native language')
        .required(),
      answerEnglish: yup.string().label('Answer in English').required(),
      answerNative: yup.string().label('Answer in native language').required(),
    }),
  ),
})

export default function Form({ toggleMenu }: Props) {
  const form = useForm({
    schema,
    defaultValues: {
      title: '',
      label: '',
      privacy: '',
      expressions: [
        {
          questionEnglish: '',
          questionNative: '',
          answerEnglish: '',
          answerNative: '',
        },
      ],
    },
  })

  const [showDoneDelete, toggleDoneDelete] = useToggle()
  const [showDeleteModal, toggleDeleteModal] = useToggle()

  const submit = (values: any) => {
    console.log(values)
    toggleDoneDelete()
  }

  return (
    <>
      {showDeleteModal && <DeleteModal onClose={toggleDeleteModal} />}
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="text-xl uppercase flex-center py-7 relative border-b border-gray-c5">
          <button
            type="button"
            className="absolute left-0 ml-4 text-gray-5f"
            style={{ top: '26px' }}
            onClick={toggleMenu}
          >
            <ArrowBack size={26} />
          </button>
          Create studyflow
        </div>
        <div className="bg-blue-light pt-3 pb-2 px-4 border-b border-gray-c5">
          <div className="uppercase text-gray-6b text-sm mb-1">Title</div>
          <input
            ref={form.register}
            name="title"
            className="placeholder-gray-a4"
            placeholder="Enter title"
          />
        </div>
        <div className="bg-blue-light pt-3 pb-2 px-4 border-b border-gray-c5">
          <div className="uppercase text-gray-6b text-sm mb-1">
            Level of difficulty
          </div>
          <RadioGroup
            form={form}
            name="level"
            values={{
              Basic: 'Basic',
              Intermediate: 'Intermediate',
              Advanced: 'Advanced',
            }}
            classes={{
              group: 'flex items-center',
              root: 'flex-center mr-5',
              input: 'w-10px h-10px ml-5px',
              error: 'text-red-600 mt-2',
            }}
          />
        </div>
        <div className="bg-blue-light pt-3 pb-2 px-4 border-b border-gray-c5">
          <div className="uppercase text-gray-6b text-sm mb-1">Privacy</div>
          <RadioGroup
            form={form}
            name="privacy"
            values={{
              'Only for me': 'Only for me',
              Public: 'Public',
              Shared: 'Shared',
            }}
            classes={{
              group: 'flex items-center',
              root: 'flex-center mr-5',
              input: 'w-10px h-10px ml-5px',
              error: 'text-red-600 mt-2',
            }}
          />
        </div>
        <Expressions form={form} />
        <div className="px-5 mt-7">
          {showDoneDelete && (
            <div className="flex">
              <button
                type="button"
                className="bg-blue-primary w-full h-10 flex-center text-white rounded-full font-bold"
              >
                Done
              </button>
              <button
                type="button"
                className="bg-red-58 w-full h-10 flex-center text-white rounded-full font-bold ml-3"
                onClick={toggleDeleteModal}
              >
                Delete
              </button>
            </div>
          )}
          {!showDoneDelete && (
            <button className="bg-blue-primary w-full h-10 flex-center text-white rounded-full font-bold">
              Create
            </button>
          )}
        </div>
      </form>
    </>
  )
}
