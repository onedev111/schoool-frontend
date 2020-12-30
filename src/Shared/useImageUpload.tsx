import React from 'react'
import photos from 'assets/images/icons/photos.png'
import { X } from '@styled-icons/boxicons-regular/X'
import dragOverState from 'Shared/dragOverState'
import cn from 'classnames'

type Preview = {
  file: File
  preview?: string
}

export default function useImageUpload() {
  const [previews, setPreviews] = React.useState<Preview[]>([])
  const [dragOver, setDragOver] = React.useState(false)

  const addFiles = (files: File[]) => {
    const limited = Array.from(files).slice(0, 3)
    setPreviews([
      ...previews,
      ...limited.map((file) => ({
        file,
      })),
    ])
    limited.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviews((previews) =>
          previews.map((preview) => {
            return preview.file === file
              ? { file, preview: reader.result as string }
              : preview
          }),
        )
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (preview: Preview) => {
    setPreviews(previews.filter((item) => item !== preview))
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const {
      dataTransfer: { items, files },
    } = e
    if (items) {
      addFiles(
        Array.from(items)
          .filter((item) => item.kind === 'file')
          .map((item) => item.getAsFile()) as File[],
      )
    } else {
      addFiles(Array.from(files))
    }
  }

  return {
    onChangeImage: (e: any) => {
      addFiles(e.target.files)
      e.target.value = []
    },
    previews,
    removeImage,
    hasPreviews: previews.some(({ preview }) => preview),
    dragArea: dragOverState.hasFiles && (
      <div
        className={cn(
          'absolute-fill flex-center text-xl b border-4 border-dashed',
          dragOver
            ? 'text-blue-primary border-blue-primary'
            : 'text-gray-8b border-gray-c5',
        )}
        style={{ background: 'rgba(255, 255, 255, .5)' }}
        onDragOver={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        Drag file here
      </div>
    ),
  }
}
