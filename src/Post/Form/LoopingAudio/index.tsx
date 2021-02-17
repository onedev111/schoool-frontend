import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import Radio from 'Shared/Form/Radio'
import looping from 'assets/images/icons/looping.png'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import ControlledTextarea from 'Shared/Form/ControlledTextarea'
import cn from 'classnames'
import Spin from 'assets/images/icons/Spin'
import { Voice } from 'Upload/api'
import api from 'api'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'

type Props = {
  state: State
}

const maxLength = 200
const schema = yup.object({
  text: yup.string().label('english sentence').max(maxLength).required(),
})

const voicesRows: Record<string, Voice>[] = [
  {
    'American male': 'Matthew',
    'American female': 'Joanna',
    'British male': 'Brian',
  },
  {
    'British female': 'Amy',
    'Luke (kid voice)': 'Ivy',
    'Zoen (slow)': 'Kendra',
  },
]

export default observer(function LoopingAudio({ state }: Props) {
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [processing, setProcessing] = React.useState(false)

  const [audio] = React.useState(() => {
    const audio = new Audio()
    audio.loop = true
    const onStop = () => setPlaying(false)
    audio.onpause = onStop
    audio.onended = onStop
    return audio
  })
  const [playing, setPlaying] = React.useState(false)
  const {
    url: draftUrl,
    text: draftText,
    voices: draftVoices,
  } = state.loopingAudioDraft

  const pause = () => {
    setPlaying(false)
    audio.pause()
  }

  React.useEffect(() => {
    return () => audio.pause()
  }, [])

  React.useEffect(() => {
    if (draftUrl) audio.src = draftUrl
  }, [draftUrl])

  const isValid = draftText.length > 0 && draftVoices.length > 0

  const convert = async () => {
    try {
      setError(undefined)
      setProcessing(true)
      schema.validateSync({ text: draftText })
      const url = await api.upload.createLoopingAudio({
        text: draftText,
        voices: draftVoices,
      })
      state.updateLoopingAudioDraft({ url })
    } catch (err) {
      setError(err.message)
      state.updateLoopingAudioDraft({ url: undefined })
    }

    setProcessing(false)
  }

  const togglePlay = () => {
    if (playing) {
      pause()
    } else {
      setPlaying(true)
      audio.play()
    }
  }

  const onClose = () => state.backToForm()

  const submit = () => {
    onClose()
    state.saveLoopingAudio()
  }

  return (
    <div className="pb-12">
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        Make Looping Audio
      </div>
      <div className="pt-4 px-6">
        <div className="text-center text-lg mb-10 text-gray-49">
          You can convert English text into audio, and make it loop
          automatically.
        </div>
        <ControlledTextarea
          value={draftText}
          onChange={(e) => {
            const { value } = e.target
            state.updateLoopingAudioDraft({ text: value })
            if (value) setError(undefined)
          }}
          error={error}
          className="mb-7 flex flex-col"
          counter
          maxLength={250}
          name="text"
          label="English text"
          placeholder="Add english sentence here"
          classes={{
            label:
              'text-17 text-bold flex items-center justify-between mb-1 px-2',
            counter: 'font-normal text-sm',
          }}
          rows={3}
        />
        <hr className="text-gray-c5" />
        <div className="mt-5 text-17 text-bold mb-2 px-2">Choose Voice</div>
        {voicesRows.map((voices, i) => (
          <div key={i} className="flex mb-4">
            {Object.keys(voices).map((value) => (
              <label key={value} className="w-full flex items-center">
                <Radio
                  type="checkbox"
                  classes={{ root: 'mr-2' }}
                  checked={draftVoices.includes(voices[value])}
                  onChange={() => state.toggleLoopingAudioVoice(voices[value])}
                  name="voice"
                  value={value}
                  size={10}
                />
                {value}
              </label>
            ))}
          </div>
        ))}
        <div className="mt-10 flex justify-center">
          <button
            className={cn(
              'w-24 flex-center flex-col',
              !isValid && 'opacity-25',
            )}
            disabled={!isValid}
            onClick={convert}
          >
            <div style={{ height: '52px' }}>
              <img src={looping} alt="Convert" className="h-full" />
            </div>
            <div className="text-sm text-gray-5b mt-1">Convert</div>
          </button>
          <div className="w-8 text-blue-primary pt-5">
            {processing && <Spin />}
          </div>
          <button
            className={cn('w-24', !draftUrl && 'opacity-25')}
            type="button"
            disabled={!draftUrl}
            onClick={togglePlay}
          >
            <div
              className="bg-blue-primary rounded-full flex-center text-white mx-auto"
              style={{ width: '52px', height: '52px' }}
            >
              {!playing && <PlayFill size={32} />}
              {playing && <PauseFill size={32} />}
            </div>
            <div className="text-sm text-gray-5b mt-1">Looped Audio</div>
          </button>
        </div>
        <div className="flex-center mt-12">
          <button
            type="button"
            className={cn(
              'h-8 bg-blue-primary text-white flex-center rounded-full',
              !draftUrl && 'invisible',
            )}
            style={{ width: '200px' }}
            disabled={!draftUrl}
            onClick={submit}
          >
            Add To Post
          </button>
        </div>
      </div>
    </div>
  )
})
