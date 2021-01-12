import { State as AudioState } from 'Post/Form/RecordAudio/State'
import { observer } from 'mobx-react-lite'
import React from 'react'

type Props = {
  state: AudioState
}

export default observer(function ProgressBar({ state }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)

  const transform = `translateX(${
    Math.round((state.currentTime * 100) / state.maxTime) - 100
  }%)`

  return (
    <div className="overflow-hidden bg-gray-e2" style={{ height: '3px' }}>
      <div
        ref={ref}
        className="w-full h-full bg-blue-0c"
        style={{ transform }}
      />
    </div>
  )
})
