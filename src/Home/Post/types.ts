export type Preview =
  | { type: 'post' | 'studyflow'; title: string; text: string }
  | { type: 'link'; image: string; title: string; text: string }

export type Video = {
  src: string
  ratio: number
}

export type Post = {
  id: number
  text: string
  joinedToClass?: boolean
  audio?: string
  loopingAudio?: string
  previews: Preview[]
  image?: string
  video?: Video
}
