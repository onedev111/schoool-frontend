import { Dayjs } from 'dayjs'

export type Preview =
  | { type: 'post' | 'studyflow'; title: string; text: string }
  | { type: 'link'; image: string; title: string; text: string }

export type Video = {
  src: string
  ratio: number
}

export type NotebookSentence = {
  text: string
  translation: string
}

export type Post = {
  id: number
  text: string
  isMine: boolean
  previews: Preview[]
  user: {
    id: number
    name: string
    avatar: string
  }
  liked: boolean
  likesCount: number
  repliesCount: number
  saved: boolean
  images: string[]
  joinedToClass?: boolean
  audio?: string
  loopingAudio?: string
  image?: string
  video?: string
  youtubeId?: string
  reachedNotebookLimit?: boolean
  date: Dayjs
  error?: string
  notebookSentence?: NotebookSentence
}

export type Comment = {
  avatar: string
  name: string
  replyId?: number
  date: Date
  liked: number
  comment: string
  previews?: Preview[]
  audio?: string
  loopingAudio?: string
  images: string[]
  video?: string
  comments?: Comment[]
}
