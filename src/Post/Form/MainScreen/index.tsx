import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import cn from 'classnames'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'
import submit from 'Post/Form/submit'
import FormTextarea from 'Post/Form/Textarea'
import Audio from 'Post/Item/Audio'
import Sentence from 'Home/Sentence'
import Link from 'Post/Item/Link'
import VideoPreview from 'Post/Form/VideoPreview'
import ImagePreviews from 'Post/Form/ImagePreviews'
import AddMediaPanel from 'Post/Form/MainScreen/AddMediaPanel'
import { State } from 'Post/Form/State'
import { State as ImageUploadState } from 'utils/imageUploadState'
import { State as VideoUploadState } from 'utils/videoUploadState'
import { State as YouTubeState } from 'utils/youTubeState'
import pluralize from 'utils/pluralize'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
  imageUploadState: ImageUploadState
  videoUploadState: VideoUploadState
  youTubeState: YouTubeState
  onClose(): void
}

export default observer(function PostFormMainScreen({
  state,
  imageUploadState,
  videoUploadState,
  youTubeState,
  onClose,
}: Props) {
  const classesCount = state.values.classIds.length

  return (
    <div>
      {imageUploadState.warningModal}
      {imageUploadState.dragArea}
      <button
        type="button"
        className="absolute top-0 right-0 text-gray-5f mt-8 mr-6"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5">
        Create
      </div>
      <div
        className={cn(
          'p-6',
          imageUploadState.hasPreviews ||
            youTubeState.video ||
            videoUploadState.url
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

        <FormTextarea state={state} />

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

        {state.values.links && state.values.links.length > 0 && (
          <div className="mt-4">
            {state.values.links?.map((link, i) => (
              <Link
                className={i !== 0 ? 'mt-4' : undefined}
                link={link}
                key={i}
                onDelete={() =>
                  state.setLinks(
                    state.values.links.filter((item) => item !== link),
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {youTubeState.video}

      {videoUploadState.url && (
        <VideoPreview
          video={videoUploadState.url}
          removeVideo={() => videoUploadState.setVideo(undefined)}
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
