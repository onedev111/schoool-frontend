import React from 'react'
import { observer } from 'mobx-react-lite'
import { EnglishLevel } from 'User/types'
import { useMutation } from 'react-query'
import api from 'api'
import './react-select.css'
import Loader from 'Shared/Loader'
import { useForm } from 'react-hook-form'
import { getCurrentUser, setCurrentUser } from 'User/currentUser'
import UploadAvatar from 'User/Auth/SignUpForm/UploadAvatar'
import LevelOfEnglish from 'User/Auth/SignUpForm/LevelOfEnglish'
import Language from 'User/Auth/SignUpForm/Language'

type Props = {
  submitText: string
  onSuccess(): void
}

export default observer(function SignUpForm({ submitText, onSuccess }: Props) {
  const user = getCurrentUser()

  const form = useForm<{
    avatar: string | { blob: Blob }
    bio: string
    language: string
    englishLevel: EnglishLevel
    location: string
  }>({
    defaultValues: {
      avatar: user.avatar,
      bio: '',
      englishLevel: user.englishLevel || 'Basic',
      language: user.language || 'English',
      location: user.location,
    },
  })

  const { mutate: loadUser } = useMutation(
    () => api.user.getUser({ id: user.id }),
    {
      onSuccess(fresh) {
        if (fresh.englishLevel !== user.englishLevel) {
          setCurrentUser({ ...user, englishLevel: fresh.englishLevel })
        }
        form.reset({ ...fresh, language: fresh.language || 'English' })
      },
    },
  )

  React.useEffect(() => loadUser(), [])

  const [error, setError] = React.useState<string | null>(null)

  const { mutate: updateProfile, isLoading } = useMutation(
    api.user.updateProfile,
    {
      onSettled(_, error) {
        if (!error) onSuccess()
        if (error) setError((error as Error).message)
      },
    },
  )

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile(form.getValues())
  }

  return (
    <form onSubmit={submit}>
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <UploadAvatar form={form} />
      <div className="mb-8">
        <div className="text-lg ml-1 mb-1">Introduction</div>
        <textarea
          ref={form.register}
          name="bio"
          className="rounded resize-none border border-gray-c5 placeholder-gray-6b py-3 px-4 w-full"
          rows={3}
          placeholder="Introduce yourself briefly. (optional)"
        />
      </div>
      <LevelOfEnglish form={form} title="Level of English" className="mb-8" />
      <Language form={form} />
      <div className="mb-10">
        <div className="text-lg ml-1 mb-1">Location</div>
        <input
          ref={form.register}
          name="location"
          className="rounded border border-gray-c5 placeholder-gray-6b px-4 w-full h-10"
          placeholder="Where do you live? (optional)"
        />
      </div>
      <div className="flex-center">
        <button
          className="bg-blue-primary rounded-full h-10 flex-center text-white font-bold w-full cursor-pointer"
          style={{ maxWidth: '300px' }}
          disabled={isLoading}
        >
          {!isLoading && submitText}
          {isLoading && <Loader className="w-8 h-8" />}
        </button>
      </div>
    </form>
  )
})
