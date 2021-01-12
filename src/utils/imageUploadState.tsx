import React from 'react'
import { makeAutoObservable } from 'mobx'
import dragOverState from 'utils/dragOverState'
import cn from 'classnames'
import Alert from 'Shared/Modal/Alert'

export type SavedImage = { isNew: false; url: string }
export type NewImage = { isNew: true; file: File; url?: string }
export type UploadingImage = SavedImage | NewImage

const maxImagesCount = 4

const supportedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

type Props = {
  images?: UploadingImage[]
  dragAreaAlwaysVisible?: boolean
  dragAreaText?: string
  onChange?(images: UploadingImage[]): void
}

const createImageUploadState = ({
  images = [],
  dragAreaAlwaysVisible,
  dragAreaText = 'Drag & Drop files here',
  onChange,
}: Props = {}) =>
  makeAutoObservable({
    onChange,
    images,
    setImages(images: UploadingImage[]) {
      this.images = images
    },
    isDragOver: false,
    setDragOver(value: boolean) {
      this.isDragOver = value
    },
    changeImages(images: UploadingImage[]) {
      if (this.onChange) this.onChange(images)
      this.setImages(images)
    },
    warning: undefined as string | undefined,
    setWarning(value: string | undefined) {
      this.warning = value
    },
    addFiles(files: File[]) {
      const filesArray = Array.from(files)
      const maxCount = maxImagesCount - this.images.length
      const filtered = filesArray
        .slice(0, maxCount)
        .filter((file) => supportedMimes.includes(file.type))

      if (files.length > maxCount)
        this.setWarning('You can only choose 4 photos')
      else if (filesArray.some((file) => !supportedMimes.includes(file.type)))
        this.setWarning('Supported image formats are jpeg, png, svg and gif')
      else this.setWarning(undefined)

      this.changeImages([
        ...this.images,
        ...filtered.map((file) => ({
          isNew: true as const,
          file,
        })),
      ])
      filtered.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          this.changeImages(
            this.images.map((image) => {
              return 'file' in image && image.file === file
                ? { isNew: true, file, url: reader.result as string }
                : image
            }),
          )
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage(image: UploadingImage) {
      this.changeImages(this.images.filter((item) => item !== image))
    },
    handleDrop(e: React.DragEvent<HTMLElement>) {
      e.preventDefault()
      const {
        dataTransfer: { items, files },
      } = e

      const images = items
        ? (Array.from(items)
            .filter((item) => item.kind === 'file')
            .map((item) => item.getAsFile()) as File[])
        : Array.from(files).filter((item) => item.type.startsWith('image'))

      this.addFiles(images)
    },
    onChangeImage(e: any) {
      this.addFiles(e.target.files)
      e.target.value = []
    },
    get hasPreviews() {
      return this.images.some(({ url }: { url: string | undefined }) => url)
    },
    get dragArea() {
      return (
        (dragAreaAlwaysVisible || dragOverState.hasImage) && (
          <div
            className={cn(
              'absolute-fill flex-center text-xl b border-4 border-dashed',
              this.isDragOver
                ? 'text-blue-primary border-blue-primary'
                : 'text-gray-8b border-gray-c5',
            )}
            style={{ background: 'rgba(255, 255, 255, .5)' }}
            onDragOver={() => this.setDragOver(true)}
            onDragLeave={() => this.setDragOver(false)}
            onDrop={(e) => this.handleDrop(e)}
          >
            {dragAreaText}
          </div>
        )
      )
    },
    get warningModal() {
      return (
        this.warning && (
          <Alert
            title={this.warning}
            onClose={() => this.setWarning(undefined)}
          />
        )
      )
    },
  })

export default function useImageUploadState(props: Props = {}) {
  const [state] = React.useState(() => createImageUploadState(props))
  return state
}

export type State = ReturnType<typeof useImageUploadState>
