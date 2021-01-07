import React from 'react'
import { observer } from 'mobx-react-lite'
import { State as AudioState } from 'Post/Form/RecordAudio/State'

const formatTime = (time: number) =>
  new Date(time).toUTCString().split(' ')[4].replace(/^00:/, '')

type Props = {
  state: AudioState
}

export default observer(function Time({ state }: Props) {
  if (!state.isRecording) return null

  return <span>{formatTime(state.currentTime * 1000)}</span>
})
