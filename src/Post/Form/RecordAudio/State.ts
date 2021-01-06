import { makeAutoObservable } from 'mobx'
import AudioRecorder from 'audio-recorder-polyfill'
;(window as any).MediaRecorder = AudioRecorder

export type UploadingAudio = {
  blob: Blob
  url: string
}

type MediaRecorder = typeof AudioRecorder
declare const MediaRecorder: MediaRecorder

export default function createAudioRecordingState() {
  return makeAutoObservable({
    maxTimeMs: 5 * 60 * 1000,
    isRecording: false,
    mediaRecorderPromise: undefined as Promise<MediaRecorder> | undefined,
    chunks: [] as BlobPart[],
    recordedTime: 0,
    startTime: 0,
    isPlaying: false,
    async getMediaRecorder() {
      if (!this.mediaRecorderPromise) {
        this.mediaRecorderPromise = new Promise((resolve, reject) => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              const mediaRecorder = new MediaRecorder(stream)

              const onStart = () => {
                this.isRecording = true
                this.startTime = Date.now()
              }

              const onStop = () => {
                this.isRecording = false
                this.recordedTime += Date.now() - this.startTime
              }

              mediaRecorder.addEventListener('start', onStart)
              mediaRecorder.addEventListener('resume', onStart)
              mediaRecorder.addEventListener('stop', onStop)
              mediaRecorder.addEventListener('pause', onStop)

              mediaRecorder.addEventListener(
                'dataavailable',
                (e: { data: BlobPart }) => {
                  this.chunks.push(e.data)
                },
              )

              return resolve(mediaRecorder)
            })
            .catch(reject)
        })
      }

      return this.mediaRecorderPromise
    },
    setIsRecording(value: boolean) {
      this.isRecording = value
    },
    setIsPlaying(value: boolean) {
      this.isPlaying = value
    },
    async toggleRecording() {
      this.isRecording ? this.stopRecording() : this.startRecording()
    },
    async startRecording() {
      const mediaRecorder = await this.getMediaRecorder()
      mediaRecorder.start()
    },
    async stopRecording() {
      const mediaRecorder = await this.getMediaRecorder()
      mediaRecorder.stop()
    },
    reset() {
      this.chunks.length = 0
    },
    get recorded() {
      return this.chunks.length > 0
    },
    get blob() {
      return new Blob(this.chunks)
    },
    get result() {
      const result: UploadingAudio = {
        blob: this.blob,
        url: URL.createObjectURL(this.blob),
      }
      return result
    },
    get audio() {
      const audio = new Audio(this.result.url)
      audio.onplay = () => this.setIsPlaying(true)
      audio.onpause = () => this.setIsPlaying(false)
      return audio
    },
  })
}

export type State = ReturnType<typeof createAudioRecordingState>
