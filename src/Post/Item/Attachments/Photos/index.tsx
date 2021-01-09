import React from 'react'
import style from 'Post/Item/Attachments/Photos/style.module.css'
import cn from 'classnames'
import FullscreenGallery from 'Post/Item/Attachments/Photos/FullscreenGallery'

type Props = {
  className?: string
  images: string[]
}

export default function Photos({ images, className }: Props) {
  const [galleryImageIndex, setGalleryImageIndex] = React.useState<
    number | undefined
  >(undefined)

  return (
    <>
      {galleryImageIndex !== undefined && (
        <FullscreenGallery
          images={images}
          openImageIndex={galleryImageIndex}
          onClose={() => setGalleryImageIndex(undefined)}
        />
      )}
      {images.length > 0 && (
        <div className={className}>
          {images.length === 1 && (
            <button
              type="button"
              className="flex-center w-full"
              onClick={() => setGalleryImageIndex(0)}
            >
              <img src={images[0]} className="max-w-full" />
            </button>
          )}
          {images.length === 2 && (
            <div className="flex w-full">
              <button
                type="button"
                className="w-1/2"
                onClick={() => setGalleryImageIndex(0)}
              >
                <img src={images[0]} className="w-full" />
              </button>
              <button
                type="button"
                className="w-1/2 ml-1"
                onClick={() => setGalleryImageIndex(1)}
              >
                <img src={images[1]} className="w-full" />
              </button>
            </div>
          )}
          {images.length === 3 && (
            <div className={style.gallery}>
              <div className={cn('flex flex-col', style.gallerySquare)}>
                <button
                  type="button"
                  onClick={() => setGalleryImageIndex(0)}
                  className="bg-center bg-cover mb-1"
                  style={{
                    height: '50%',
                    backgroundImage: `url('${images[0]}')`,
                  }}
                />
                <div
                  className="flex"
                  style={{
                    height: '50%',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(1)}
                    className="w-1/2 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[1]}')`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(2)}
                    className="w-1/2 ml-1 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[2]}')`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {images.length === 4 && (
            <div className={style.gallery}>
              <div className={cn('flex flex-col', style.gallerySquare)}>
                <div
                  className="flex mb-1"
                  style={{
                    height: '50%',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(0)}
                    className="w-1/2 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[0]}')`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(1)}
                    className="w-1/2 ml-1 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[1]}')`,
                    }}
                  />
                </div>
                <div
                  className="flex"
                  style={{
                    height: '50%',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(2)}
                    className="w-1/2 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[2]}')`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setGalleryImageIndex(3)}
                    className="w-1/2 ml-1 bg-center bg-cover"
                    style={{
                      backgroundImage: `url('${images[3]}')`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
