import React from 'react'
import Fullscreen from 'Post/Item/Attachments/Fullscreen'
import { ChevronLeft } from '@styled-icons/fa-solid/ChevronLeft'
import { ChevronRight } from '@styled-icons/fa-solid/ChevronRight'
import { useKey } from 'react-use'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

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
  const [swiperRef] = React.useState<{ current: Swiper | null }>({
    current: null,
  })

  const prev = () => swiperRef.current?.slidePrev()
  const next = () => swiperRef.current?.slideNext()
  useKey('ArrowLeft', prev)
  useKey('ArrowRight', next)

  React.useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container')
  }, [])

  return (
    <Fullscreen onClose={onClose}>
      <div className="w-full h-full flex-center px-5">
        {images.length > 1 && (
          <button type="button" className="text-gray-bb mr-5" onClick={prev}>
            <ChevronLeft size={52} />
          </button>
        )}
        <div className="swiper-container h-full w-full">
          <div className="swiper-wrapper">
            {images
              .slice(openImageIndex)
              .concat(images.slice(0, openImageIndex))
              .map((image, i) => (
                <div key={i} className="flex-center swiper-slide">
                  <img src={image} className="max-w-full max-h-full" />
                </div>
              ))}
          </div>
        </div>
        {images.length > 1 && (
          <button type="button" className="text-gray-bb ml-5" onClick={next}>
            <ChevronRight size={52} />
          </button>
        )}
      </div>
    </Fullscreen>
  )
}
