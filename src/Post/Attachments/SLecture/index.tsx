import React from 'react'
import { SLecture } from 'Post/types'
import Fullscreen from 'Post/Attachments/Fullscreen'
import routes from 'routes'
import { Link } from 'react-router-dom'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { ArrowLeft } from '@styled-icons/bootstrap/ArrowLeft'
import cn from 'classnames'
import { formatTime } from 'utils/time'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'
import { Link as LinkIcon } from '@styled-icons/entypo/Link'

type Props = {
  user: {
    id: number
    name: string
    avatar: string
  }
  sLecture: SLecture
  onClose(): void
}

const Progress = React.memo(
  ({
    audio,
    endTime,
    isPlaying,
  }: {
    audio: HTMLAudioElement
    endTime: string
    isPlaying: boolean
  }) => {
    const ref = React.useRef(null)
    const [currentTime, setCurrentTime] = React.useState(0)

    React.useEffect(() => {
      if (isPlaying) {
        const animation = () => {
          setCurrentTime(audio.currentTime)
          request = requestAnimationFrame(animation)
        }
        let request = requestAnimationFrame(animation)

        return () => cancelAnimationFrame(request)
      } else {
        setCurrentTime(audio.currentTime)
      }
    }, [audio, isPlaying])

    const changePosition = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const button = (ref.current as unknown) as HTMLElement
      const { left, width } = button.getBoundingClientRect()
      if (audio.duration)
        audio.currentTime = ((e.clientX - left) * audio.duration) / width
    }

    return (
      <>
        <button
          type="button"
          ref={ref}
          className="w-full flex-center mt-6 h-3"
          onClick={changePosition}
        >
          <div className="bg-gray-dc h-px w-full relative">
            <div
              className="bg-blue-06 absolute top-0 left-0 h-px"
              style={{
                width: `${(currentTime * 100) / (audio.duration || 1)}%`,
              }}
            />
          </div>
        </button>
        <div className="w-full flex justify-between text-sm text-gray-8b mt-2">
          <div>{formatTime(currentTime)}</div>
          <div>{endTime}</div>
        </div>
      </>
    )
  },
)

export default function SLecturePage({ user, sLecture, onClose }: Props) {
  const [index, setIndex] = React.useState(0)
  const item = sLecture.items[index]
  const [endTime, setEndTime] = React.useState('00:00')
  const [isPlaying, setPlaying] = React.useState(false)

  const [audio] = React.useState(() => {
    const audio = new window.Audio(item.audio)
    audio.onloadedmetadata = () => {
      setEndTime(formatTime(audio.duration))
      audio.currentTime = 0
      audio.play()
    }
    audio.onplay = () => setPlaying(true)
    audio.onpause = () => setPlaying(false)
    audio.onended = () =>
      setIndex((index) =>
        index < sLecture.items.length - 1 ? index + 1 : index,
      )
    return audio
  })

  React.useEffect(() => {
    if (audio.src !== item.audio) audio.src = item.audio
  }, [item])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
  }

  return (
    <Fullscreen onClose={onClose} showClose={false}>
      <div
        className="w-full h-full mx-auto bg-white flex flex-col pt-12 items-center"
        style={{ maxWidth: '500px' }}
      >
        <Link
          to={routes.user(user.id)}
          className="rounded-full bg-center bg-cover border border-blue-25"
          style={{
            borderWidth: '3px',
            width: '63px',
            height: '63px',
            backgroundImage: `url("${user.avatar}")`,
          }}
        />
        <div className="flex-grow flex items-center px-12 text-xl w-full">
          <div className="w-full">
            {item.text}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                className="rounded py-2 px-3 bg-gray-f7 flex items-center block w-full mt-5"
              >
                <div className="bg-blue-06 rounded text-white flex-center w-12 h-12">
                  <LinkIcon size={32} />
                </div>
                <div className="ml-3 text-gray-3b text-sm">{item.link}</div>
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center w-full px-12">
          <button
            type="button"
            className="w-12 h-12 flex-center rounded-full border border-blue-06 text-blue-primary"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <PauseFill size={38} />
            ) : (
              <PlayFill className="ml-1 mt-px" size={38} />
            )}
          </button>
          <Progress audio={audio} endTime={endTime} isPlaying={isPlaying} />
          <div className="mt-3 flex-center w-full relative pb-12">
            <button
              type="button"
              className="absolute top-0 left-0 w-8 h-8 flex-center"
              onClick={onClose}
            >
              <ArrowLeft size={26} />
            </button>
            {sLecture.items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  'w-8 h-8 rounded-lg flex-center border',
                  i !== 0 && 'ml-5',
                  i === index
                    ? 'border-blue-06 text-blue-06'
                    : 'border-black text-black',
                )}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}
