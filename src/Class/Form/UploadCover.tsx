import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'
import UploadPhoto from 'Shared/UploadPhoto'
import { Camera } from '@styled-icons/entypo/Camera'
import ErrorMessage from 'Shared/Form/ErrorMessage'
import useToggle from 'utils/useToggle'

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
          title="Upload cover photo"
          setImage={(image) => form.setValue('image', image)}
          onClose={toggleUploadImage}
        />
      )}
      <Controller
        control={form.control}
        name="image"
        render={({ value }) => {
          const url = typeof value === 'string' ? value : value?.url

          return (
            <>
              <button
                type="button"
                className="rounded border border-gray-8b flex-center bg-center bg-cover"
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundImage: url && `url("${url}")`,
                }}
                onClick={toggleUploadImage}
              >
                {!value && <Camera className="text-black" size={36} />}
              </button>
              {!value && <ErrorMessage form={form} name="image" />}
            </>
          )
        }}
      />
    </>
  )
}
