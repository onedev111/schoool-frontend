import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import cn from 'classnames'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'
import submit from 'Post/Form/submit'
import ContentEditable from 'Shared/Form/ContentEditable'
import Audio from 'Post/Item/Audio'
import Sentence from 'Home/Sentence'
import Link from 'Post/Attachments/Link'
import VideoPreview from 'Post/Form/VideoPreview'
import ImagePreviews from 'Post/Form/ImagePreviews'
import AddMediaPanel from 'Post/Form/MainScreen/AddMediaPanel'
import { State } from 'Post/Form/State'
import { State as ImageUploadState } from 'utils/imageUploadState'
import { State as VideoUploadState } from 'utils/videoUploadState'
import { State as YouTubeState } from 'utils/youTubeState'
import pluralize from 'utils/pluralize'
import { observer } from 'mobx-react-lite'
import ZoomIcon from 'assets/images/icons/Zoom'
import ZoomLink from 'Post/Attachments/Link/ZoomLink'
import SharedPostLink from 'Post/Attachments/Link/SharedPostLink'

type Props = {
  state: State
  imageUploadState: ImageUploadState
  videoUploadState: VideoUploadState
  youTubeState: YouTubeState
  onClose(): void
  tryToClose(): void
}

export default observer(function PostFormMainScreen({
  state,
  imageUploadState,
  videoUploadState,
  youTubeState,
  onClose,
  tryToClose,
}: Props) {
  const classesCount = state.values.classIds.length

  return (
    <div>
      {imageUploadState.warningModal}
      {imageUploadState.dragArea}
      <button
        type="button"
        className="absolute top-0 right-0 text-gray-5f mt-8 mr-6"
        onClick={tryToClose}
      >
        <X size={32} />
      </button>
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5">
        {state.values.id ? 'Edit Post' : 'Create'}
      </div>
      <div
        className={cn(
          'p-6',
          imageUploadState.hasPreviews ||
            youTubeState.video ||
            videoUploadState.video
            ? 'pb-0'
            : 'border-b border-gray-c5',
        )}
      >
        <div className="flex">
          <button
            type="button"
            className="w-1/2 bg-gray-f7 flex items-center justify-between px-5 text-xl h-10 rounded-full border border-gray-8b block relative z-30"
            onClick={() => state.setCurrentScreen('selectTarget')}
          >
            {classesCount > 0
              ? `${classesCount} ${pluralize('class', classesCount, 'es')}`
              : state.values.isPublic
              ? 'Public'
              : 'Only for me'}
            <CaretDown size={24} />
          </button>
          <button
            type="button"
            className={cn(
              'w-1/2 ml-7 bg-blue-primary text-white h-10 rounded-full font-bold flex-center',
              !state.canPost && 'opacity-25',
            )}
            disabled={!state.canPost}
            onClick={() => {
              onClose()
              submit({ state })
            }}
          >
            Post
          </button>
        </div>

        <div className="mt-7 mb-4 text-lg block">
          <ContentEditable
            placeholder="Post anything about English learning."
            editorRef={state.editorRef}
            getValue={() => state.values.html}
            setValue={(html) => state.setHTML(html)}
          />
        </div>

        {state.values.audio && (
          <Audio
            src={state.values.audio.url}
            className="mt-4"
            onDelete={() => state.setAudio()}
          />
        )}

        {state.values.loopingAudio && (
          <Audio
            src={state.values.loopingAudio}
            loop
            className="mt-4"
            onDelete={() => state.setLoopingAudio()}
          />
        )}

        {state.values.notebookSentence && (
          <Sentence state={state} className="mt-4" />
        )}

        {state.values.sharedPost && (
          <SharedPostLink
            sharedPost={state.values.sharedPost}
            className="mt-4"
            onDelete={() => state.setSharedPost()}
          />
        )}

        {state.values.zoomLink && (
          <ZoomLink
            className="mt-4"
            zoomLink={state.values.zoomLink}
            onDelete={() => state.setZoomLink()}
          />
        )}
      </div>

      {youTubeState.video}

      {videoUploadState.video && (
        <VideoPreview
          video={videoUploadState.video.url}
          removeVideo={() => videoUploadState.setFile(undefined)}
          className="mt-4"
        />
      )}

      <ImagePreviews
        images={imageUploadState.images}
        removeImage={(image) => imageUploadState.removeImage(image)}
      />

      <AddMediaPanel
        state={state}
        imageUploadState={imageUploadState}
        videoUploadState={videoUploadState}
      />
    </div>
  )
})
