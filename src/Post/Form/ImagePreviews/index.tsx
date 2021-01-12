import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import { UploadingImage } from 'utils/imageUploadState'

type Props = {
  images: UploadingImage[]
  removeImage(link: UploadingImage): void
}

export default function ImagePreviews({ images, removeImage }: Props) {
  return (
    <>
      {images.map((image, i) => {
        if (!image.url) return <React.Fragment key={i} />

        return (
          <div
            key={i}
            className="mt-4 flex-center relative"
            style={{ minHeight: '80px' }}
          >
            <button
              type="button"
              className="w-10 h-10 flex-center text-white absolute top-0 right-0 mt-5 mr-7"
              style={{ background: 'rgba(0, 0, 0, .3)' }}
              onClick={() => removeImage(image)}
            >
              <X size={28} />
            </button>
            <img className="max-w-full" src={image.url} alt="image" />
          </div>
        )
      })}
    </>
  )
}
