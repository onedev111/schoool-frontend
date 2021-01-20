import React from 'react'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { StopFill } from '@styled-icons/bootstrap/StopFill'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { AudioState, createState } from 'Post/Item/Audio/state'
import ProgressBar from 'Post/Item/Audio/ProgressBar'
import { useKey } from 'react-use'
import useToggle from 'utils/useToggle'
import cn from 'classnames'
import audioRipples from 'assets/images/audio-ripples.png'
import { X } from '@styled-icons/boxicons-regular/X'

const formatTime = (seconds: number) => {
  const time = dayjs(0).utc().second(seconds)
  if (time.hour() > 0) return time.format('hh:mm:ss')
  else return time.format('mm:ss')
}

const useKeyWhenFocused = (
  focused: boolean,
  key: string,
  fn: () => void,
  deps: unknown[],
) =>
  useKey(
    key,
    (e) => {
      if (!focused) return
      e.preventDefault()
      fn()
    },
    {},
    [focused, ...deps],
  )

type Props = {
  src: string
  loop?: boolean
  className?: string
  compact?: boolean
  onDelete?(): void
}

export default observer(function Audio({
  src,
  loop,
  compact,
  className,
  onDelete,
}: Props) {
  const [state, setState] = React.useState<AudioState>()
  const [audio, setAudio] = React.useState<HTMLAudioElement>()

  React.useEffect(() => {
    return () => audio?.pause()
  }, [audio])

  React.useEffect(() => {
    const state = createState()
    setState(state)

    const audio = new window.Audio(src)
    audio.loop = Boolean(loop)
    audio.onloadedmetadata = () => state.setDuration(audio.duration)
    audio.onplay = () => state.setPlaying(true)
    audio.onpause = () => state.setPlaying(false)
    audio.onended = () => state.setCurrentTime(0)
    setAudio(audio)
  }, [src, loop])

  const togglePlay = () => {
    if (state?.playing) audio?.pause()
    else audio?.play()
  }

  const stop = () => {
    if (!audio || !state) return
    audio.pause()
    audio.currentTime = 0
    state.setCurrentTime(0)
  }

  React.useEffect(() => {
    if (!state || !audio) return

    if (state.playing) {
      const animation = () => {
        state.setCurrentTime(audio.currentTime)
        request = requestAnimationFrame(animation)
      }
      let request = requestAnimationFrame(animation)

      return () => cancelAnimationFrame(request)
    } else {
      state.setCurrentTime(audio.currentTime)
    }
  }, [audio, state?.playing])

  const [focused, toggleFocused] = useToggle()
  useKeyWhenFocused(focused, ' ', togglePlay, [audio])
  useKeyWhenFocused(
    focused,
    'ArrowLeft',
    () => {
      if (!audio) return

      const value = audio.currentTime
      audio.currentTime = Math.max(value - 1, 0)
    },
    [audio],
  )
  useKeyWhenFocused(
    focused,
    'ArrowRight',
    () => {
      if (!audio || !state) return

      const value = audio.currentTime as number
      audio.currentTime = Math.min(value + 1, state.duration)
    },
    [audio],
  )

  if (!state || !audio) return null

  return (
    <div
      style={{ height: '44px' }}
      className={cn(
        'w-full rounded-full text-white flex-center text-sm',
        compact ? 'px-4' : 'px-6',
        loop ? 'bg-mustard-darkest cursor-pointer' : 'bg-blue-primary',
        className,
      )}
      tabIndex={-1}
      onFocus={toggleFocused}
      onBlur={toggleFocused}
      onClick={loop ? togglePlay : undefined}
    >
      <button onClick={loop ? undefined : togglePlay}>
        {state.playing ? <PauseFill size={36} /> : <PlayFill size={36} />}
      </button>
      {loop && (
        <>
          <div
            className={cn(
              'text-lg text-white font-bold whitespace-no-wrap',
              compact ? 'px-2' : 'px-4',
            )}
          >
            Looping Audio
          </div>
          <div className="flex-grow flex-center select-none">
            <img src={audioRipples} alt="audio ripples" />
          </div>
        </>
      )}
      {!loop && (
        <>
          <div className={cn('text-sm', compact ? 'mr-2' : 'mr-3 ml-1')}>
            {formatTime(state.currentTime)}
          </div>
          <ProgressBar audio={audio} state={state} />
          <div className={cn('text-sm', compact ? 'ml-2' : 'ml-3 mr-1')}>
            {state.duration ? formatTime(state.duration) : null}
          </div>
          <button onClick={stop}>
            <StopFill size={36} />
          </button>
        </>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onDelete()
          }}
          className="ml-4"
        >
          <X size={36} />
        </button>
      )}
    </div>
  )
})
