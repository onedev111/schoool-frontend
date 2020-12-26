import { makeAutoObservable } from 'mobx'

export const createState = () =>
  makeAutoObservable({
    duration: 0,
    setDuration(value: number) {
      this.duration = value
    },
    currentTime: 0,
    setCurrentTime(value: number) {
      this.currentTime = value
    },
    playing: false,
    setPlaying(value: boolean) {
      this.playing = value
    },
  })

export type AudioState = ReturnType<typeof createState>
