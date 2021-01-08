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
import useEmojiPicker from 'Shared/useEmojiPicker'
import { State as ImageUploadState } from 'utils/imageUploadState'
import { State as VideoUploadState } from 'utils/videoUploadState'

type Props = {
  state: State
  imageUploadState: ImageUploadState
  videoUploadState: VideoUploadState
}

export default function AddMediaPanel({
  state,
  imageUploadState,
  videoUploadState,
}: Props) {
  const toggleEmoji = useEmojiPicker({ editorRef: state.editorRef })

  return (
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
        <button type="button" onClick={() => state.setCurrentScreen('youtube')}>
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
          onMouseDown={() => {
            state.openTagModal()
          }}
        >
          <img src={tag} alt="add tag" />
        </button>
        <button className="text-gray-a4" data-tip="Emoji" onClick={toggleEmoji}>
          <Smile size={28} />
        </button>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
    </div>
  )
}
