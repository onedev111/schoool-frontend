import React from 'react'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { StopFill } from '@styled-icons/bootstrap/StopFill'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'
import dayjs from 'dayjs'
import { Howl } from 'howler'
import { observer } from 'mobx-react-lite'
import { createState } from './state'
import ProgressBar from 'Home/Post/Audio/ProgressBar'
import { useKey } from 'react-use'
import useToggle from 'Shared/useToggle'
import cn from 'classnames'

const formatTime = (seconds: number) => {
  const time = dayjs(0).utc().second(seconds)
  if (time.hour() > 0) return time.format('hh:mm:ss')
  else return time.format('mm:ss')
}

const useKeyWhenFocused = (focused: boolean, key: string, fn: () => void) =>
  useKey(
    key,
    (e) => {
      if (!focused) return
      e.preventDefault()
      fn()
    },
    {},
    [focused],
  )

type Props = {
  src: string
  loop?: boolean
  className?: string
  compact?: boolean
}

export default observer(function Audio({
  src,
  loop,
  compact,
  className,
}: Props) {
  const [state] = React.useState(createState)

  const [audio] = React.useState(() => {
    const audio = new Howl({
      src,
      loop,
      onload() {
        state.setDuration(audio.duration())
      },
      onplay() {
        state.setPlaying(true)
      },
      onpause() {
        state.setPlaying(false)
      },
      onstop() {
        state.setPlaying(false)
      },
      onend() {
        state.setPlaying(false)
      },
    })
    return audio
  })

  const togglePlay = () => {
    if (audio.playing()) audio.pause()
    else audio.play()
  }

  React.useEffect(() => {
    if (state.playing) {
      const animation = () => {
        state.setCurrentTime(audio.seek() as number)
        request = requestAnimationFrame(animation)
      }
      let request = requestAnimationFrame(animation)

      return () => cancelAnimationFrame(request)
    } else {
      state.setCurrentTime(audio.seek() as number)
    }
  }, [state.playing])

  const [focused, toggleFocused] = useToggle()
  useKeyWhenFocused(focused, ' ', togglePlay)
  useKeyWhenFocused(focused, 'ArrowLeft', () => {
    const value = audio.seek() as number
    audio.seek(Math.max(value - 1, 0))
  })
  useKeyWhenFocused(focused, 'ArrowRight', () => {
    const value = audio.seek() as number
    audio.seek(Math.min(value + 1, audio.duration()))
  })

  return (
    <div
      style={{ height: '44px' }}
      className={cn(
        'w-full rounded-full text-white flex-center text-sm',
        compact ? 'px-4' : 'px-6',
        loop ? 'bg-mustard-darkest' : 'bg-blue-primary',
        className,
      )}
      tabIndex={-1}
      onFocus={toggleFocused}
      onBlur={toggleFocused}
    >
      <button onClick={togglePlay}>
        {state.playing ? <PauseFill size={36} /> : <PlayFill size={36} />}
      </button>
      <div className={cn('text-sm', compact ? 'mr-2' : 'mr-3 ml-1')}>
        {formatTime(state.currentTime)}
      </div>
      <ProgressBar audio={audio} state={state} />
      <div className={cn('text-sm', compact ? 'ml-2' : 'ml-3 mr-1')}>
        {state.duration ? formatTime(state.duration) : null}
      </div>
      <button onClick={() => audio.stop()}>
        <StopFill size={36} />
      </button>
    </div>
  )
})
