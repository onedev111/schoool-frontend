import React from 'react'
import { User } from '@styled-icons/boxicons-solid/User'
import cn from 'classnames'
import UploadPhoto from 'Shared/UploadPhoto'
import createProfileFormState, { State } from 'User/Auth/SignUpForm/State'
import useToggle from 'utils/useToggle'
import { observer } from 'mobx-react-lite'
import { EnglishLevel } from 'User/types'
import { useMutation, useQuery } from 'react-query'
import api from 'api'
import Select from 'react-select'
import './react-select.css'
import Spin from 'assets/images/icons/Spin'
import Loader from 'Shared/Loader'
import history from 'utils/history'
import routes from 'routes'

const BioTextArea = observer(({ state }: { state: State }) => (
  <textarea
    className="rounded resize-none border border-gray-8b text-gray-6b py-3 px-4 w-full"
    rows={3}
    placeholder="Introduce yourself briefly. (optional)"
    value={state.values.bio}
    onChange={(e) => state.setBio(e.target.value)}
  />
))

const englishLevels: EnglishLevel[] = ['Basic', 'Intermediate', 'Advanced']

export default observer(function SignUpForm() {
  const [state] = React.useState(() => createProfileFormState())
  const [uploadPhotoOpen, toggleUploadPhoto] = useToggle(false)
  const { data: constants } = useQuery('constants', api.constants.getAll)
  const [error, setError] = React.useState<string | null>(null)

  const [updateProfile, { isLoading }] = useMutation(api.user.updateProfile, {
    onSettled(_, error) {
      if (!error) history.push(routes.home())
      if (error) setError((error as Error).message)
    },
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateProfile(state.values)
  }

  return (
    <>
      {uploadPhotoOpen && (
        <UploadPhoto
          title="Upload profile photo"
          setImage={(image) => state.setAvatar(image)}
          onClose={toggleUploadPhoto}
        />
      )}
      <form className="h-full flex-center" onSubmit={submit}>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <div
          className="shadow bg-white py-10 px-12 w-full"
          style={{ maxWidth: '640px' }}
        >
          <div className="mb-5">
            <button
              type="button"
              className="flex items-center cursor-pointer"
              onClick={toggleUploadPhoto}
            >
              {state.values.avatar && (
                <img
                  src={state.values.avatar.url}
                  width={100}
                  height={100}
                  className="rounded-full mr-4"
                />
              )}
              {!state.values.avatar && (
                <div
                  className="bg-gray-bb text-white flex-center rounded-full mr-4"
                  style={{ width: '100px', height: '100px' }}
                >
                  <User size={72} />
                </div>
              )}
              <div className="text-blue-primary text-lg font-bold">
                Profile Photo
              </div>
            </button>
          </div>
          <div className="mb-8">
            <div className="text-lg ml-1 mb-1">Introduction</div>
            <BioTextArea state={state} />
          </div>
          <div className="mb-8">
            <div className="text-lg ml-1 mb-1 uppercase">Level of English</div>
            <div className="flex">
              {englishLevels.map((level, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-10 cursor-pointer flex-center border-gray-97 w-1/3',
                    state.values.englishLevel === level && 'bg-gray-dc',
                    i === 0 && 'border rounded-l',
                    i !== 0 &&
                      i !== englishLevels.length - 1 &&
                      'border-t border-b',
                    i === englishLevels.length - 1 && 'border rounded-r',
                  )}
                  onClick={() => state.setEnglishLevel(level)}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="text-lg ml-1 mb-1 uppercase">Language</div>
            {!constants && (
              <div className="py-2 pl-4">
                <Spin className="animate-spin h-8 w-8 mr-3 text-blue-primary" />
              </div>
            )}
            {constants && (
              <Select
                classNamePrefix="react-select"
                value={{
                  value: state.values.language,
                  label: state.values.language,
                }}
                onChange={({ value }: any) => state.setLanguage(value)}
                options={constants.languages.map((value) => ({
                  value,
                  label: value,
                }))}
              />
            )}
          </div>
          <div className="mb-10">
            <div className="text-lg ml-1 mb-1">Location</div>
            <input
              className="rounded border border-gray-8b text-gray-6b px-4 w-full h-10"
              placeholder="Where do you live? (optional)"
              value={state.values.location}
              onChange={(e) => state.setLocation(e.target.value)}
            />
          </div>
          <div className="flex-center">
            <button
              className={cn(
                'bg-blue-primary rounded-full h-10 flex-center text-white font-bold w-full cursor-pointer',
                !constants && 'opacity-25',
              )}
              style={{ maxWidth: '300px' }}
              disabled={!constants}
            >
              {!isLoading && 'Submit'}
              {isLoading && <Loader className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </form>
    </>
  )
})
