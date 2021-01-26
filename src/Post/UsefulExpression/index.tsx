import React from 'react'
import { InfoLarge } from '@styled-icons/typicons/InfoLarge'
import style from 'Home/style.module.css'
import { Equalizer } from '@styled-icons/remix-fill/Equalizer'
import Volume from 'assets/images/icons/volume'
import Notebook from 'assets/images/icons/notebook'
import { UsefulExpression } from 'Post/types'
import useToggle from 'utils/useToggle'
import Info from './Info'
import cn from 'classnames'
import AddSentence from 'Notebook/AddSentence'
import { useMutation } from 'react-query'
import api from 'api'
import ChangeLevelModal from 'Post/UsefulExpression/ChangeLevelModal'

type Props = {
  item: UsefulExpression
}

const defaultTranslation =
  'This side is to show the translation of English sentences in the user’s native language. As your native language is English, there’s no translation to show'

const playTimes = 3
const playAgainTimeoutMs = 200

export default function UsefulExpressionItem({ item }: Props) {
  const [openInfo, toggleInfo] = useToggle()
  const [height, setHeight] = React.useState<number>()
  const textRef = React.useRef<HTMLDivElement>(null)
  const translationRef = React.useRef<HTMLDivElement>(null)
  const [showTranslation, toggleTranslation] = useToggle()
  const [openAddToNotebook, toggleAddToNotebook] = useToggle()
  const [audioUrl, setAudioUrl] = React.useState<string>()
  const [isPlaying, setPlaying] = React.useState(false)
  const [, setPlayedTimes] = React.useState(0)
  const [playAgainTimeout, setPlayAgainTimeout] = React.useState(0)
  const [audio] = React.useState(() => {
    const audio = new window.Audio()
    audio.onplay = () => setPlaying(true)
    audio.onpause = () => setPlaying(false)
    audio.onended = () => {
      setPlayedTimes((times) => {
        const value = times + 1
        if (value < playTimes) {
          setPlayAgainTimeout(
            () =>
              (setTimeout(() => {
                audio.currentTime = 0
                audio.play()
              }, playAgainTimeoutMs) as unknown) as number,
          )
        }
        return value
      })
    }
    return audio
  })

  const [openChangeLevel, toggleChangeLevel] = useToggle()

  React.useEffect(() => {
    return () => {
      clearTimeout(playAgainTimeout)
      audio.pause()
    }
  }, [])

  React.useEffect(() => {
    const text = textRef.current
    const translation = translationRef.current
    if (text && translation) {
      setHeight(Math.max(text.offsetHeight, translation.offsetHeight))
    }
  }, [])

  const { mutate: loadAudio, isLoading: isLoadingAudio } = useMutation(
    api.app.speech,
    {
      onSuccess(url) {
        setAudioUrl(url)
        audio.src = url
        audio.play()
      },
    },
  )

  const toggleSpeech = () => {
    if (isPlaying) {
      console.log('pause')
      clearTimeout(playAgainTimeout)
      audio.pause()
    } else if (audioUrl) {
      setPlayedTimes(0)
      audio.currentTime = 0
      audio.play()
    } else if (!isLoadingAudio) loadAudio({ text: item.sentence })
  }

  return (
    <div className="bg-white shadow relative py-6 px-5 mb-5 pb-12">
      {openInfo && <Info onClose={toggleInfo} />}
      {openAddToNotebook && (
        <AddSentence
          onClose={toggleAddToNotebook}
          title="Send to my notebook"
          buttonText="Add"
          contentClass="pt-4 px-5 pb-6"
          buttonWrapClass="flex-center mt-5"
          sentence={{
            text: item.sentence,
            translation: item.translation,
          }}
        />
      )}
      {openChangeLevel && <ChangeLevelModal onClose={toggleChangeLevel} />}
      <div className="flex items-center justify-between text-blue-primary text-xl mb-4">
        <div className="uppercase">Useful expressions</div>
        <InfoLarge onClick={toggleInfo} size={22} />
      </div>
      <div
        className={cn('text-gray-4f text-2xl relative', style.largeText)}
        style={{ height }}
        onClick={toggleTranslation}
      >
        <div
          ref={textRef}
          className="transition-all ease-in-out duration-500"
          style={{
            minHeight: height,
            transform: showTranslation ? 'rotateX(180deg)' : undefined,
            opacity: showTranslation ? 0 : undefined,
          }}
        >
          {item.sentence}
        </div>
        <div
          ref={translationRef}
          className="absolute top-0 left-0 right-0 transition-all duration-500 opacity-0"
          style={{
            minHeight: height,
            transform: !showTranslation ? 'rotateX(-180deg)' : undefined,
            opacity: showTranslation ? 1 : undefined,
          }}
        >
          {item.translation || defaultTranslation}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 mr-5 mb-5 h-8 flex items-center">
        <button
          type="button"
          onClick={toggleChangeLevel}
          className="h-8 w-8 flex-center cursor-pointer"
        >
          <Equalizer className="transform rotate-90" size={16} />
        </button>
        <button
          type="button"
          className={cn(
            'h-8 w-8 flex-center cursor-pointer ml-2',
            isPlaying && 'text-blue-primary',
            isLoadingAudio && 'opacity-50',
          )}
          onClick={toggleSpeech}
          disabled={isLoadingAudio}
        >
          <Volume />
        </button>
        <button
          type="button"
          onClick={toggleAddToNotebook}
          className="h-8 w-8 flex-center cursor-pointer ml-2"
        >
          <Notebook className="h-4" />
        </button>
      </div>
    </div>
  )
}
