import React from 'react'
import { observer } from 'mobx-react-lite'
import { State as AudioState } from 'Post/Form/RecordAudio/State'

const formatTime = (time: number) =>
  new Date(time).toUTCString().split(' ')[4].replace(/^00:/, '')

type Props = {
  state: AudioState
}

export default observer(function Time({ state }: Props) {
  const ref = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (state.isRecording) {
      let request = 0

      const animation = () => {
        if (ref.current) {
          const time = state.recordedTime + Date.now() - state.startTime
          ref.current.textContent = formatTime(time)
        }
        request = requestAnimationFrame(animation)
      }

      animation()

      return () => {
        cancelAnimationFrame(request)
      }
    } else {
      if (ref.current) ref.current.textContent = formatTime(state.recordedTime)
    }
  }, [state.isRecording])

  React.useEffect(() => {
    if (!state.recorded && ref.current) ref.current.textContent = formatTime(0)
  }, [state.recorded])

  if (!state.isRecording) return null

  return <span ref={ref} />
})
