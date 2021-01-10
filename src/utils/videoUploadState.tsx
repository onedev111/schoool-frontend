import React from 'react'
import { makeAutoObservable } from 'mobx'
import dragOverState from 'utils/dragOverState'
import cn from 'classnames'
import Alert from 'Shared/Modal/Alert'

export type UploadingVideo = File

type Props = {
  onChange?(video: UploadingVideo | undefined): void
}

const supportedMimes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
]

const createVideoUploadState = ({ onChange }: Props = {}) =>
  makeAutoObservable({
    onChange,
    video: undefined as UploadingVideo | undefined,
    setVideo(video: UploadingVideo | undefined) {
      if (video && !supportedMimes.includes(video.type)) {
        this.setWarning('Supported video formats are mp4, ogg and webm')
        this.setVideo(undefined)
        return
      }

      if (onChange) onChange(video)
      this.video = video
    },
    isDragOver: false,
    setDragOver(value: boolean) {
      this.isDragOver = value
    },
    warning: undefined as string | undefined,
    setWarning(value: string | undefined) {
      this.warning = value
    },
    handleDrop(e: React.DragEvent<HTMLElement>) {
      e.preventDefault()
      const {
        dataTransfer: { items, files },
      } = e

      const video = items
        ? (Array.from(items)
            .filter(
              (item) => item.kind === 'file' && item.type.startsWith('video'),
            )[0]
            .getAsFile() as File)
        : Array.from(files).filter((item) => item.type.startsWith('video'))[0]

      this.setVideo(video)
    },
    onChangeVideo(e: any) {
      this.setVideo(e.target.files[0])
      e.target.value = []
    },
    get url() {
      return this.video && URL.createObjectURL(this.video)
    },
    get dragArea() {
      return (
        dragOverState.hasVideo && (
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
            Drag video here
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

export default function useVideoUploadState(props: Props = {}) {
  const [state] = React.useState(() => createVideoUploadState(props))
  return state
}

export type State = ReturnType<typeof useVideoUploadState>
