import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'
import UploadPhoto from 'Shared/UploadPhoto'
import useToggle from 'utils/useToggle'
import { User } from '@styled-icons/boxicons-solid/User'

type Props = {
  // eslint-disable-next-line
  form: UseFormMethods<any>
}

export default function UploadCover({ form }: Props) {
  const [openUploadImage, toggleUploadImage] = useToggle()

  return (
    <>
      {openUploadImage && (
        <UploadPhoto
          title="Upload profile photo"
          setImage={(image) => form.setValue('avatar', image)}
          onClose={toggleUploadImage}
        />
      )}
      <Controller
        control={form.control}
        name="avatar"
        render={({ value }) => {
          const url = typeof value === 'string' ? value : value?.url

          return (
            <div className="mb-5">
              <button
                type="button"
                className="flex items-center cursor-pointer"
                onClick={toggleUploadImage}
              >
                {url && (
                  <img
                    src={url}
                    width={100}
                    height={100}
                    className="rounded-full mr-4"
                  />
                )}
                {!url && (
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
          )
        }}
      />
    </>
  )
}
