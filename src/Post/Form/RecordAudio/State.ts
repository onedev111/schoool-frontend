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
    animationRequest: 0,
    currentTime: 0,
    url: '',
    audio: new Audio(),
    async getMediaRecorder() {
      if (!this.mediaRecorderPromise) {
        this.mediaRecorderPromise = new Promise((resolve, reject) => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              const mediaRecorder = new MediaRecorder(stream)

              const animation = () => {
                const time = this.recordedTime + Date.now() - this.startTime
                this.currentTime = Math.min(time, this.maxTimeMs)
                if (this.currentTime === this.maxTimeMs)
                  return this.stopRecording()

                this.animationRequest = requestAnimationFrame(animation)
              }

              const onStart = () => {
                this.isRecording = true
                this.startTime = Date.now()
                this.animationRequest = requestAnimationFrame(animation)
              }

              const onStop = () => {
                this.isRecording = false
                this.recordedTime += Date.now() - this.startTime
                this.url = URL.createObjectURL(this.blob)
                this.audio = new Audio(this.url)
                this.audio.src = this.result.url
                this.audio.onplay = () => this.setIsPlaying(true)

                const onStop = () => this.setIsPlaying(false)
                this.audio.onpause = onStop
                this.audio.onended = onStop

                cancelAnimationFrame(this.animationRequest)
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
      this.pauseAudio()
    },
    async stopRecording() {
      const mediaRecorder = await this.getMediaRecorder()
      mediaRecorder.stop()
      mediaRecorder.stream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop())
    },
    reset() {
      this.chunks.length = 0
      this.recordedTime = 0
      this.currentTime = 0
      this.pauseAudio()
    },
    playAudio() {
      this.audio.play()
      this.isPlaying = true
    },
    pauseAudio() {
      this.audio.pause()
      this.isPlaying = false
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
        url: this.url,
      }
      return result
    },
  })
}

export type State = ReturnType<typeof createAudioRecordingState>
