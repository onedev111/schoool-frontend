import React from 'react'
import Modal from 'Shared/Modal'
import { useForm } from 'react-hook-form'
import LevelOfEnglish from 'User/Auth/SignUpForm/LevelOfEnglish'
import { useMutation } from 'react-query'
import api from 'api'
import {
  getCurrentUser,
  getCurrentUserId,
  setCurrentUser,
} from 'User/currentUser'
import { EnglishLevel } from 'User/types'
import Loader from 'Shared/Loader'
import { queryClient } from 'utils/queryClient'

type Props = {
  onClose(): void
}

export default function ChangeLevelModal({ onClose }: Props) {
  const currentUserEnglishLevel = getCurrentUser().englishLevel

  const form = useForm({
    defaultValues: {
      englishLevel: currentUserEnglishLevel as EnglishLevel,
    },
  })

  const { mutate: loadUser } = useMutation(
    () => api.user.getUser({ id: getCurrentUserId() }),
    {
      onSuccess(user) {
        if (user.englishLevel !== currentUserEnglishLevel) {
          setCurrentUser({
            ...getCurrentUser(),
            englishLevel: user.englishLevel,
          })
          form.reset({ englishLevel: user.englishLevel })
          queryClient.invalidateQueries(['posts'])
        }
      },
    },
  )

  React.useEffect(() => loadUser(), [])

  const { mutate: saveLevel, isLoading: isSaving } = useMutation(
    api.user.updateEnglishLevel,
    {
      onSuccess() {
        onClose()
      },
    },
  )

  const submit = () => {
    const { englishLevel } = form.getValues()
    saveLevel({ englishLevel })
  }

  return (
    <Modal onClose={onClose} scroll={false}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="text-center text-xl mt-8 mb-6">
          Select your English level
        </div>
        <div className="px-10">
          <LevelOfEnglish form={form} />
        </div>
        <div className="py-5 text-center text-lg">
          You can change this later
        </div>
        <hr className="text-gray-bb" />
        <div className="flex-center">
          <button
            className="rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold flex-center"
            disabled={isSaving}
          >
            {isSaving && <Loader className="w-5 h-5 mr-2" />}
            Done
          </button>
        </div>
      </form>
    </Modal>
  )
}
