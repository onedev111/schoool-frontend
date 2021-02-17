import React from 'react'
import { State } from 'Post/Form/State'
import photos from 'assets/images/icons/photos.png'
import camera from 'assets/images/icons/camera.png'
import youtube from 'assets/images/icons/youtube.png'
import record from 'assets/images/icons/record-audio.png'
import looping from 'assets/images/icons/looping.png'
import Notebook from 'assets/images/icons/notebook'
import tag from 'assets/images/icons/tag.png'
import { Smile } from '@styled-icons/fa-regular'
import ReactTooltip from 'react-tooltip'
import useEmojiPicker from 'utils/useEmojiPicker'
import { imageMimes, State as ImageUploadState } from 'utils/imageUploadState'
import { State as VideoUploadState, videoMimes } from 'utils/videoUploadState'
import ZoomIcon from 'assets/images/icons/Zoom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
  imageUploadState: ImageUploadState
  videoUploadState: VideoUploadState
}

export default observer(function AddMediaPanel({
  state,
  imageUploadState,
  videoUploadState,
}: Props) {
  const toggleEmoji = useEmojiPicker({
    state,
    onChange: () => {
      const editor = state.editorRef.current
      if (editor) state.setHTML(editor.innerHTML)
    },
  })

  const { values } = state
  const disableImage = Boolean(
    values.video || values.youtubeId || values.images.length === 4,
  )
  const disableVideo = Boolean(
    values.images.length > 0 || values.youtubeId || values.video,
  )
  const disableYouTube = Boolean(
    values.video || values.images.length > 0 || values.youtubeId,
  )
  const disableAudio = Boolean(values.audio)
  const disableLoopingAudio = Boolean(values.loopingAudio)
  const disableNotebookSentence = Boolean(values.notebookSentence)
  const disableZoom = Boolean(
    state.values.sharedPost || state.values.link || state.values.zoomLink,
  )

  return (
    <div className="pt-3 px-7 pb-7">
      <div className="uppercase mb-3">Add media</div>
      <div className="flex items-center justify-between">
        <label className={cn('cursor-pointer', disableImage && 'opacity-25')}>
          <img src={photos} alt="photos" data-tip="Photo" />
          <input
            type="file"
            multiple
            hidden
            accept={imageMimes.join(',')}
            onChange={(e) => imageUploadState.onChangeImage(e)}
            disabled={disableImage}
          />
        </label>
        <label className={cn('cursor-pointer', disableVideo && 'opacity-25')}>
          <img src={camera} alt="video" data-tip="Video" />
          <input
            type="file"
            hidden
            accept={videoMimes.join(',')}
            onChange={(e) => videoUploadState.onChangeVideo(e)}
            disabled={disableVideo}
          />
        </label>
        <button
          type="button"
          onClick={() => state.setCurrentScreen('youtube')}
          data-tip="YouTube"
          className={cn(disableYouTube && 'opacity-25')}
          disabled={disableYouTube}
        >
          <img src={youtube} alt="youtube" />
        </button>
        <button
          type="button"
          onClick={() => state.setCurrentScreen('audio')}
          data-tip="Voice"
          className={cn(disableAudio && 'opacity-25')}
          disabled={disableAudio}
        >
          <img src={record} alt="audio" />
        </button>
        <button
          type="button"
          onClick={() => state.setCurrentScreen('loopingAudio')}
          data-tip="Looping Audio"
          className={cn(disableLoopingAudio && 'opacity-25')}
          disabled={disableLoopingAudio}
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
          className={cn(disableNotebookSentence && 'opacity-25')}
          disabled={disableNotebookSentence}
        >
          <Notebook style={{ width: '36px' }} />
        </button>
        <button
          type="button"
          data-tip="Tag Friends or Class"
          onMouseDown={() => state.setCurrentScreen('tag')}
        >
          <img src={tag} alt="add tag" />
        </button>
        <button
          type="button"
          data-tip="Zoom Meeting"
          className={cn(disableZoom && 'opacity-25')}
          disabled={disableZoom}
          onClick={() => state.setCurrentScreen('zoom')}
        >
          <ZoomIcon size={32} />
        </button>
        <button
          className="text-gray-a4 js-emoji-button"
          data-tip="Emoji"
          onClick={toggleEmoji}
        >
          <Smile size={28} />
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
    </div>
  )
})
