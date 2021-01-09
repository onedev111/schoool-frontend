import React from 'react'
import ReactSwipe from 'react-swipe'
import Fullscreen from 'Post/Item/Attachments/Fullscreen'
import { ChevronLeft } from '@styled-icons/fa-solid/ChevronLeft'
import { ChevronRight } from '@styled-icons/fa-solid/ChevronRight'
import { useKey } from 'react-use'

type Props = {
  images: string[]
  openImageIndex?: number
  onClose(): void
}

export default function FullscreenGallery({
  images,
  openImageIndex = 0,
  onClose,
}: Props) {
  let reactSwipe: ReactSwipe | null = null

  useKey('ArrowLeft', () => reactSwipe?.prev())
  useKey('ArrowRight', () => reactSwipe?.next())

  return (
    <Fullscreen onClose={onClose}>
      <div className="w-full h-full flex-center relative px-5">
        {images.length > 1 && (
          <button
            type="button"
            className="text-gray-bb mr-5"
            onClick={() => reactSwipe?.prev()}
          >
            <ChevronLeft size={52} />
          </button>
        )}
        <ReactSwipe
          className="w-full"
          ref={(el) => {
            reactSwipe = el
          }}
        >
          {images
            .slice(openImageIndex)
            .concat(images.slice(0, openImageIndex))
            .map((image, i) => (
              <div key={i} className="w-full h-full flex-center">
                <img src={image} className="max-w-full max-h-full" />
              </div>
            ))}
        </ReactSwipe>
        {images.length > 1 && (
          <button
            type="button"
            className="text-gray-bb ml-5"
            onClick={() => reactSwipe?.next()}
          >
            <ChevronRight size={52} />
          </button>
        )}
      </div>
    </Fullscreen>
  )
}
