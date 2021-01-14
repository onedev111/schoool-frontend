import React from 'react'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import RadioGroup from 'Shared/Form/RadioGroup'
import Expressions from 'Studyflow/Form/Expressions'
import useToggle from 'utils/useToggle'
import DeleteModal from 'Shared/Modal/Delete'
import Input from 'Shared/Form/Input'
import api from 'api'
import { StudyFlowType } from 'Studyflow/types'
import Loader from 'Shared/Loader'
import { StudyFlowStore } from 'Studyflow/Store'
import useStudyFlowForm from './useForm'
import useCreateStudyFlow from 'Studyflow/Form/useCreate'
import SelectTarget from 'Studyflow/Form/SelectTarget'

type Props = {
  type: StudyFlowType
  onClose(): void
}

const classes = {
  blueFormGroup: 'bg-blue-light pt-3 pb-2 px-4 border-b border-gray-c5',
  blueFormGroupLabel: 'uppercase text-gray-6b text-sm mb-1 block',
  radioGroup: {
    group: 'flex items-center',
    root: 'flex-center mr-5',
    input: 'w-10px h-10px ml-5px',
    error: 'text-red-600 mt-2',
  },
}

export default function Form({ type, onClose }: Props) {
  const form = useStudyFlowForm({ type })
  const [showDeleteModal, toggleDeleteModal] = useToggle()
  const [error, setError] = React.useState<Error>()
  const [isPublic, setIsPublic] = React.useState(false)
  const [userIds, setUserIds] = React.useState<number[]>([])
  const { create, createdStudyFlow, isCreating } = useCreateStudyFlow({
    type,
    setError,
    isPublic,
    userIds,
  })

  const handleDelete = async () => {
    if (!createdStudyFlow) return

    try {
      await api.studyFlow.remove({ id: createdStudyFlow.id })
      StudyFlowStore.removeBy({ id: createdStudyFlow.id })
      onClose()
    } catch (error) {
      setError(error)
    }
  }

  // eslint-disable-next-line
  const submit = create as any

  return (
    <>
      {showDeleteModal && (
        <DeleteModal onClose={toggleDeleteModal} onDelete={handleDelete} />
      )}
      <form onSubmit={form.handleSubmit(submit)}>
        {error && (
          <div className="text-red-500 text-center mb-2">{error.message}</div>
        )}
        <div className="text-xl uppercase flex-center py-7 relative border-b border-gray-c5">
          <button
            type="button"
            className="absolute left-0 ml-4 text-gray-5f"
            style={{ top: '26px' }}
            onClick={onClose}
          >
            <ArrowBack size={26} />
          </button>
          Create studyflow
        </div>
        <Input
          form={form}
          name="title"
          label="Title"
          placeholder="Enter title"
          classes={{
            root: classes.blueFormGroup,
            label: classes.blueFormGroupLabel,
            input: 'placeholder-gray-a4',
            error: 'text-red-600 mt-2',
          }}
        />
        <div className={classes.blueFormGroup}>
          <div className={classes.blueFormGroupLabel}>Level of difficulty</div>
          <RadioGroup
            form={form}
            name="level"
            values={{
              basic: 'Basic',
              intermediate: 'Intermediate',
              advanced: 'Advanced',
            }}
            classes={classes.radioGroup}
          />
        </div>
        <SelectTarget
          form={form}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          userIds={userIds}
          setUserIds={setUserIds}
          classes={{
            root: classes.blueFormGroup,
            label: classes.blueFormGroupLabel,
            radioGroup: classes.radioGroup,
          }}
        />
        <Expressions type={type} form={form} />
        <div className="px-5 mt-7">
          {createdStudyFlow && (
            <div className="flex">
              <button
                type="button"
                className="bg-blue-primary w-full h-10 flex-center text-white rounded-full font-bold"
                onClick={onClose}
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
          {!createdStudyFlow && (
            <button className="bg-blue-primary w-full h-10 flex-center text-white rounded-full font-bold">
              {isCreating && <Loader className="w-5 h-5" />}
              {!isCreating && 'Create'}
            </button>
          )}
        </div>
      </form>
    </>
  )
}
