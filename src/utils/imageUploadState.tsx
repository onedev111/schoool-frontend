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
    showMaxWarning: false,
    setShowMaxWarning(value: boolean) {
      this.showMaxWarning = value
    },
    addFiles(files: File[]) {
      const limited = Array.from(files).slice(
        this.images.length,
        maxImagesCount,
      )
      this.setShowMaxWarning(files.length > maxImagesCount)
      this.changeImages([
        ...this.images,
        ...limited.map((file) => ({
          file,
        })),
      ])
      limited.forEach((file) => {
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
      if (items) {
        this.addFiles(
          Array.from(items)
            .filter((item) => item.kind === 'file')
            .map((item) => item.getAsFile()) as File[],
        )
      } else {
        this.addFiles(Array.from(files))
      }
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
        dragOverState.hasFiles && (
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
            Drag file here
          </div>
        )
      )
    },
    get warningModal() {
      return (
        this.showMaxWarning && (
          <Alert
            title="You can only choose 4 photos"
            onClose={() => this.setShowMaxWarning(false)}
          />
        )
      )
    },
  })

export default function useImageUploadState(props: Props = {}) {
  const [state] = React.useState(() => createImageUploadState(props))
  return state
}
