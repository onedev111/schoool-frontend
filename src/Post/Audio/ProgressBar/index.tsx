import React from 'react'
import { Howl } from 'howler'
import { AudioState } from 'Post/Audio/state'
import { observer } from 'mobx-react-lite'

type Props = {
  audio: Howl
  state: AudioState
}

export default observer(function ProgressBar({ audio, state }: Props) {
  const ref = React.useRef(null)

  const changePosition = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const button = (ref.current as unknown) as HTMLElement
    const { left, width } = button.getBoundingClientRect()
    audio.seek(((e.clientX - left) * state.duration) / width)
  }

  const progressPercent = `${
    state.duration ? (state.currentTime * 100) / state.duration : 0
  }%`

  return (
    <button
      ref={ref}
      className="flex-grow flex-center relative py-2"
      onClick={changePosition}
    >
      <div className="w-full bg-gray-d6 relative" style={{ height: '2px' }}>
        <div
          className="w-full h-full bg-white"
          style={{ width: progressPercent }}
        />
        <div className="relative mr-5">
          <div
            className="w-5 h-5 rounded-full bg-white shadow-lg absolute top-0"
            style={{
              marginTop: '-11px',
              left: progressPercent,
            }}
          />
        </div>
      </div>
    </button>
  )
})
