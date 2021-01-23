import React from 'react'
import { observer } from 'mobx-react-lite'
import SelectTarget from 'Post/Form/SelectTarget'
import YouTube from 'Post/Form/YouTube'
import SentenceForm from 'Post/Form/SentenceForm'
import TagModal from 'Post/Form/TagModal'
import RecordAudio from 'Post/Form/RecordAudio'
import LoopingAudioModal from 'Post/Form/LoopingAudio'
import { createFormState } from 'Post/Form/State'
import useImageUploadState from 'utils/imageUploadState'
import useVideoUploadState from 'utils/videoUploadState'
import useYouTubeState from 'utils/youTubeState'
import Modal from 'Shared/Modal'
import Zoom from 'Post/Form/Zoom'
import { useOnChangeSelectionRange } from 'utils/contentEditable'
import PostFormMainScreen from 'Post/Form/MainScreen'
import LeaveWarning from 'Shared/LeaveWarning'
import useToggle from 'utils/useToggle'
import { Post } from 'Post/types'

type Props = {
  post?: Partial<Post>
  onClose(): void
}

export default observer(function PostFormModal({ post, onClose }: Props) {
  const [state] = React.useState(() => createFormState({ post }))
  const [leaveWarning, toggleLeaveWarning] = useToggle()

  useOnChangeSelectionRange((range) => state.setSelectionRange(range))

  const youTubeState = useYouTubeState({
    close: true,
    className: 'mt-4',
    youtubeId: state.values.youtubeId,
    onChange(id) {
      state.setYouTubeId(id)
    },
  })

  const imageUploadState = useImageUploadState({
    images: state.values.images,
    onChange: (images) => state.setImages(images),
  })

  const videoUploadState = useVideoUploadState({
    video: state.values.video,
    onChange: (video) => state.setVideo(video),
  })

  React.useEffect(() => {
    if (!state.canPost) return

    window.onbeforeunload = () => 'Changes you made may not be saved.'
    return () => {
      window.onbeforeunload = null
    }
  }, [state.canPost])

  const tryToClose = () => {
    if (!state.canPost) return onClose()

    toggleLeaveWarning()
  }

  return (
    <>
      {state.currentScreen === 'tag' && <TagModal state={state} />}
      <Modal
        width={550}
        className="relative"
        hidden={state.currentScreen === 'tag'}
      >
        {state.currentScreen === 'selectTarget' && (
          <SelectTarget state={state} />
        )}
        {state.currentScreen === 'youtube' && (
          <YouTube
            youtubeId={youTubeState.youtubeId}
            youtubeState={youTubeState}
            onClose={() => state.backToForm()}
          />
        )}
        {state.currentScreen === 'sentence' && <SentenceForm state={state} />}
        {state.currentScreen === 'audio' && <RecordAudio state={state} />}
        {state.currentScreen === 'loopingAudio' && (
          <LoopingAudioModal state={state} />
        )}
        {state.currentScreen === 'zoom' && <Zoom state={state} />}
        {(state.currentScreen === 'form' || state.currentScreen === 'tag') && (
          <PostFormMainScreen
            state={state}
            imageUploadState={imageUploadState}
            videoUploadState={videoUploadState}
            youTubeState={youTubeState}
            onClose={onClose}
            tryToClose={tryToClose}
          />
        )}
      </Modal>
      {leaveWarning && (
        <LeaveWarning cancel={toggleLeaveWarning} close={onClose} />
      )}
    </>
  )
})
