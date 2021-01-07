import React from 'react'
import { makeAutoObservable } from 'mobx'
import dragOverState from 'Shared/dragOverState'
import cn from 'classnames'
import Alert from 'Shared/Modal/Alert'

export type UploadingImage = {
  file: File
  preview?: string
}

const maxImagesCount = 4

const supportedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

type Props = {
  onChange?(images: UploadingImage[]): void
}

const createImageUploadState = ({ onChange }: Props = {}) =>
  makeAutoObservable({
    onChange,
    images: [] as UploadingImage[],
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
      const filtered = filesArray
        .slice(this.images.length, maxImagesCount)
        .filter((file) => supportedMimes.includes(file.type))

      if (files.length > maxImagesCount)
        this.setWarning('You can only choose 4 photos')
      else if (filesArray.some((file) => !supportedMimes.includes(file.type)))
        this.setWarning('Supported image formats are jpeg, png, svg and gif')
      else this.setWarning(undefined)

      this.changeImages([
        ...this.images,
        ...filtered.map((file) => ({
          file,
        })),
      ])
      filtered.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          this.changeImages(
            this.images.map((image) => {
              return image.file === file
                ? { file, preview: reader.result as string }
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
      return this.images.some(
        ({ preview }: { preview: string | undefined }) => preview,
      )
    },
    get dragArea() {
      return (
        dragOverState.hasImage && (
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
            onDrop={this.handleDrop}
          >
            Drag images here
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
