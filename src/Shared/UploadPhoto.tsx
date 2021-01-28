import React from 'react'
import CropperJS from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { RotateRight } from '@styled-icons/boxicons-regular/RotateRight'
import { Flip } from '@styled-icons/material/Flip'
import Modal from 'Shared/Modal'
import useImageUploadState, { imageMimes } from 'utils/imageUploadState'

type Props = {
  title: string
  setImage(image: { blob: Blob; url: string }): void
  onClose(): void
}

export default function UploadPhoto({
  title,
  setImage: submitImage,
  onClose,
}: Props) {
  const ref = React.useRef<HTMLImageElement>(null)
  const [image, setImage] = React.useState<string | undefined>()
  const [cropper, setCropper] = React.useState<CropperJS | undefined>()
  const [scale, setScale] = React.useState<[number, number]>([1, 1])

  const imageUploadState = useImageUploadState({
    dragAreaAlwaysVisible: true,
    dragAreaText: 'Drag & Drop files here or click to browse',
    onChange: (images) => {
      const image = images[0]
      if (image?.url) setImage(image.url)
    },
  })

  const submit = () => {
    cropper?.getCroppedCanvas().toBlob((blob) => {
      if (blob)
        submitImage({
          blob: blob,
          url: URL.createObjectURL(blob),
        })
      onClose()
    })
  }

  React.useEffect(() => {
    if (!image || !ref.current) return

    const imageElement = ref.current
    const cropper = new CropperJS(imageElement, {
      aspectRatio: 1,
      movable: false,
    })
    setCropper(cropper)
  }, [image])

  React.useEffect(() => {
    if (cropper) cropper.scale(...scale)
  }, [scale, cropper])

  return (
    <Modal size="large" onClose={() => !image && onClose()}>
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        {title}
      </div>
      {!image && (
        <>
          {imageUploadState.warningModal}
          <label className="p-6 block">
            <div className="h-64 relative">{imageUploadState.dragArea}</div>
            <input
              type="file"
              multiple
              hidden
              accept={imageMimes.join(',')}
              onChange={(e) => imageUploadState.onChangeImage(e)}
            />
          </label>
        </>
      )}
      {image && (
        <>
          <div className="flex-center px-6 py-3">
            <button
              type="button"
              className="flex-center text-gray-5f transition duration-200 hover:text-blue-primary"
              onClick={() => cropper?.rotate(90)}
            >
              <RotateRight size={28} className="mr-2" />
              Rotate
            </button>
            <button
              type="button"
              className="flex-center text-gray-5f transition duration-200 hover:text-blue-primary ml-4"
              onClick={() => setScale([-scale[0], scale[1]])}
            >
              <Flip size={26} className="mr-2" />
              Flip horizontal
            </button>
            <button
              type="button"
              className="flex-center text-gray-5f transition duration-200 hover:text-blue-primary ml-4"
              onClick={() => setScale([scale[0], -scale[1]])}
            >
              <Flip size={26} className="transform rotate-90 mr-2" />
              Flip Vertical
            </button>
          </div>
          <div className="w-full">
            <img ref={ref} src={image} alt="photo" className="max-w-full" />
          </div>
          <div className="px-6 py-4 flex-center">
            <button
              type="button"
              className="h-10 flex-center font-bold block px-5 mr-4 border border-gray-c5 rounded-full"
              onClick={() => {
                imageUploadState.changeImages([])
                setImage(undefined)
              }}
            >
              Choose Another
            </button>
            <button
              type="button"
              className="h-10 rounded-full bg-blue-primary text-white flex-center font-bold block px-5"
              onClick={submit}
            >
              Use this Photo
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
