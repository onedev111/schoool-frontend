import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'
import cn from 'classnames'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'
import createAudioRecordingState from 'Post/Form/RecordAudio/State'
import Time from 'Post/Form/RecordAudio/Time'
import ProgressBar from 'Post/Form/RecordAudio/ProgressBar'

type Props = {
  state: State
}

export default observer(function RecordAudio({ state: postState }: Props) {
  const audio = postState.values.audio
  const [state] = React.useState(() =>
    createAudioRecordingState({ audio: audio?.isNew ? audio : undefined }),
  )

  const onClose = () => postState.backToForm()

  const submit = () => {
    postState.setAudio(state.result)
    state.stopRecording()
    onClose()
  }

  return (
    <div className="pb-12">
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        Record Voice Over
      </div>
      <ProgressBar state={state} />
      <div className="flex-col flex-center mb-7">
        <button
          type="button"
          onClick={() => state.toggleRecording()}
          className={cn(
            'text-15 border border-blue-0c rounded-full',
            state.isRecording || state.recorded
              ? 'bg-blue-0c text-white'
              : 'text-blue-0c',
          )}
          style={{
            marginTop: '57px',
            width: '100px',
            height: '100px',
            borderWidth: '4px',
          }}
        >
          {state.isRecording
            ? 'Recording'
            : state.recorded
            ? 'Resume'
            : 'Start'}
        </button>
        <div className="text-gray-6b mt-2 h-6">
          <Time state={state} />
        </div>
      </div>
      {state.isRecording && <div className="h-10" />}
      {!state.recorded && !state.isRecording && (
        <div className="flex-center text-lg h-10">
          Record your lecture. It is limted to 20 minutes.
        </div>
      )}
      {state.recorded && !state.isRecording && (
        <div className="flex-center">
          <button
            type="button"
            className="h-8 rounded-full border-2 border-blue-primary text-blue-primary flex-center font-bold"
            style={{ width: '130px' }}
            onClick={() => state.reset()}
          >
            Reset
          </button>
          {!state.isPlaying && (
            <button
              type="button"
              className="ml-7"
              onClick={() => {
                state.playAudio()
              }}
            >
              <PlayFill size={40} />
            </button>
          )}
          {state.isPlaying && (
            <button
              type="button"
              className="ml-7"
              onClick={() => {
                state.pauseAudio()
              }}
            >
              <PauseFill size={40} />
            </button>
          )}
          <button
            type="button"
            className={cn(
              'h-8 rounded-full bg-blue-primary text-white flex-center font-bold ml-7',
              !state.result && 'opacity-25',
            )}
            style={{ width: '130px' }}
            onClick={submit}
            disabled={Boolean(!state.result)}
          >
            Add To Post
          </button>
        </div>
      )}
    </div>
  )
})
