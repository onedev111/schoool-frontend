import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import { Preview } from 'Shared/useImageUpload'

type Props = {
  previews: Preview[]
  removeImage(preview: Preview): void
}

export default function ImagePreviews({ previews, removeImage }: Props) {
  return (
    <>
      {previews.map((preview, i) => {
        if (!preview.preview) return <React.Fragment key={i} />

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
              onClick={() => removeImage(preview)}
            >
              <X size={28} />
            </button>
            <img className="max-w-full" src={preview.preview} alt="image" />
          </div>
        )
      })}
    </>
  )
}
