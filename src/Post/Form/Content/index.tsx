import React from 'react'
import { X } from '@styled-icons/boxicons-regular/X'
import camera from 'assets/images/icons/camera.png'
import youtube from 'assets/images/icons/youtube.png'
import record from 'assets/images/icons/record-audio.png'
import looping from 'assets/images/icons/looping.png'
import Notebook from 'assets/images/icons/notebook'
import tag from 'assets/images/icons/tag.png'
import { Smile } from '@styled-icons/fa-regular'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import photos from 'assets/images/icons/photos.png'
import useEmojiPicker from 'Shared/useEmojiPicker'
import SelectTarget from 'Post/Form/SelectTarget'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'
import YouTube from 'Post/Form/YouTube'
import useYouTube from 'Shared/useYouTube'
import ImagePreviews from 'Post/Form/ImagePreviews'
import SentenceForm from 'Post/Form/SentenceForm'
import Sentence from 'Home/Sentence'
import TagModal from 'Post/Form/TagModal'
import AudioModal from 'Post/Form/AudioModal'
import LoopingAudioModal from 'Post/Form/LoopingAudioModal'
import { createFormState } from 'Post/Form/State'
import FormTextarea from 'Post/Form/Textarea'
import submit from 'Post/Form/submit'
import useImageUploadState from 'utils/imageUploadState'
import useVideoUploadState from 'utils/videoUploadState'
import VideoPreview from 'Post/Form/VideoPreview'

type Props = {
  onClose(): void
}

export default observer(function PostFormModal({ onClose }: Props) {
  const [state] = React.useState(() => createFormState())

  const { youtubeId, youtubeVideoHeight, setYoutubeId, video } = useYouTube({
    close: true,
    className: 'mt-4',
  })

  const imageUploadState = useImageUploadState({
    onChange: (images) => state.setImages(images),
  })

  const videoUploadState = useVideoUploadState({
    onChange: (video) => state.setVideo(video),
  })

  const toggleEmoji = useEmojiPicker({ editorRef: state.editorRef })

  React.useEffect(() => {
    window.onbeforeunload = () => 'Changes you made may not be saved.'
    return () => {
      window.onbeforeunload = null
    }
  })

  if (state.currentScreen === 'privacy') return <SelectTarget state={state} />

  if (state.currentScreen === 'youtube')
    return (
      <YouTube
        youtubeId={youtubeId}
        setYoutubeId={setYoutubeId}
        onClose={() => state.backToForm()}
      />
    )

  if (state.currentScreen === 'sentence') return <SentenceForm state={state} />

  if (state.currentScreen === 'tag') return <TagModal state={state} />

  if (state.currentScreen === 'audio') return <AudioModal state={state} />

  if (state.currentScreen === 'loopingAudio')
    return <LoopingAudioModal state={state} />

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
            (youtubeId && youtubeVideoHeight) ||
            videoUploadState.url
            ? 'pb-0'
            : 'border-b border-gray-c5',
        )}
      >
        <div className="flex">
          <button
            type="button"
            className="w-1/2 bg-gray-f7 flex items-center justify-between px-5 text-xl h-10 rounded-full border border-gray-8b block relative z-30"
            onClick={() => state.setCurrentScreen('privacy')}
          >
            {state.values.privacy}
            <CaretDown size={24} />
          </button>
          <button
            type="button"
            className={cn(
              'w-1/2 ml-7 bg-blue-primary text-white h-10 rounded-full font-bold flex-center',
              !state.isValid && 'opacity-25',
            )}
            disabled={!state.isValid}
            onClick={() => {
              onClose()
              submit({ state })
            }}
          >
            Post
          </button>
        </div>
        <FormTextarea state={state} />

        {state.values.notebookSentence && (
          <Sentence state={state} className="mt-4" />
        )}
      </div>

      {video}

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

      <div className="pt-3 px-7 pb-7">
        <div className="uppercase mb-3">Add media</div>
        <div className="flex items-center justify-between">
          <label className="cursor-pointer">
            <img src={photos} alt="photos" data-tip="Photo" />
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => imageUploadState.onChangeImage(e)}
            />
          </label>
          <label className="cursor-pointer">
            <img src={camera} alt="video" data-tip="Video" />
            <input
              type="file"
              hidden
              onChange={(e) => videoUploadState.onChangeVideo(e)}
            />
          </label>
          <button
            type="button"
            onClick={() => state.setCurrentScreen('youtube')}
          >
            <img src={youtube} alt="youtube" data-tip="Youtube" />
          </button>
          <button
            type="button"
            onClick={() => state.setCurrentScreen('audio')}
            data-tip="Voice"
          >
            <img src={record} alt="audio" />
          </button>
          <button
            type="button"
            onClick={() => state.setCurrentScreen('loopingAudio')}
            data-tip="Looping Audio"
          >
            <img
              src={looping}
              alt="looping audio"
              className="w-10"
              data-tip="Looping Audio"
            />
          </button>
          <button
            type="button"
            data-tip="Notebook SentenceForm"
            onClick={() => state.setCurrentScreen('sentence')}
          >
            <Notebook style={{ width: '36px' }} />
          </button>
          <button
            type="button"
            data-tip="Tag Friends or Class"
            onClick={() => state.setCurrentScreen('tag')}
          >
            <img src={tag} alt="add tag" />
          </button>
          <button
            className="text-gray-a4"
            data-tip="Emoji"
            onClick={toggleEmoji}
          >
            <Smile size={28} />
          </button>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </div>
      </div>
    </div>
  )
})
