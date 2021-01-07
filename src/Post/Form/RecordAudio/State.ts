import { makeAutoObservable } from 'mobx'
import {
  createAudioRecorder,
  defaultState,
  RecorderState,
} from 'utils/audioRecorder'

export type UploadingAudio = {
  arrayBuffer: ArrayBuffer
  blob: Blob
  url: string
  duration: number
}

type Props = {
  audio?: UploadingAudio
}

export default function createAudioRecordingState({ audio }: Props) {
  const recorder = createAudioRecorder({
    arrayBuffer: audio?.arrayBuffer,
    currentTime: audio?.duration,
  })

  const createAudioElement = (state: {
    setIsPlaying(value: boolean): void
    result?: UploadingAudio
  }) => {
    if (!state.result) return undefined

    const audio = new Audio(state.result.url)
    audio.onended = () => state.setIsPlaying(false)
    return audio
  }

  const state = makeAutoObservable({
    maxTime: 20 * 60,
    state: defaultState,
    recorded: Boolean(audio),
    currentTime: audio?.duration || 0,
    isPlaying: false,
    result: audio as UploadingAudio | undefined,
    audio: undefined as HTMLAudioElement | undefined,
    setState(state: RecorderState) {
      this.state = state
      this.recorded = true
      if (this.state === 'recording') {
        this.result = undefined
        this.audio = undefined
      }
      if (this.state === 'paused') this.requestAudio()
    },
    setCurrentTime(time: number) {
      this.currentTime = time
    },
    setIsPlaying(value: boolean) {
      this.isPlaying = value
    },
    toggleRecording() {
      recorder.toggle()
    },
    stopRecording() {
      recorder.stop()
    },
    reset() {
      recorder.clearAudioData()
      if (this.audio) this.audio.pause()
      this.recorded = false
      this.currentTime = 0
      this.isPlaying = false
      this.audio = undefined
      this.result = undefined
      this.pauseAudio()
    },
    playAudio() {
      if (this.audio) this.audio.play()
      else this.requestAudio()

      this.setIsPlaying(true)
    },
    pauseAudio() {
      if (this.audio) this.audio.pause()
      this.setIsPlaying(false)
    },
    requestAudio() {
      recorder.requestAudio()
    },
    get isRecording() {
      return this.state === 'recording'
    },
  })

  state.audio = createAudioElement(state)

  recorder.addEventListener('stateChange', (e) => {
    state.setState(e.data)
  })

  recorder.addEventListener('timeChange', (e) => {
    let time = e.data
    if (time >= state.maxTime) {
      time = state.maxTime
      recorder.pause()
    }
    state.setCurrentTime(time)
  })

  recorder.addEventListener('audio', (e) => {
    if (state.audio) state.audio.pause()

    const blob = new Blob([e.data], { type: 'audio/wav' })
    const url = URL.createObjectURL(blob)
    state.result = {
      arrayBuffer: e.data,
      blob,
      url,
      duration: state.currentTime,
    }
    state.audio = createAudioElement(state)
    if (state.isPlaying) state.audio?.play()
  })

  return state
}

export type State = ReturnType<typeof createAudioRecordingState>
