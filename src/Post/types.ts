import { Dayjs } from 'dayjs'

export type NotebookSentence = {
  text: string
  translation: string
}

export type Post = {
  id: number
  isUploading: boolean
  isPublic: boolean
  classIds: number[]
  text: string
  isMine: boolean
  user: {
    id: number
    name: string
    avatar: string
  }
  liked: boolean
  likesCount: number
  commentsCount: number
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
  tags: Tag[]
  zoomLink?: string
  sharedPost?: SharedPost
}

export type TagType = 'user' | 'class' | 'studyflow'

export type TagToInsert = {
  id: number
  name: string
  image: string
  type: TagType
}

export type Tag = {
  id: number
  type: TagType
  start: number
  length: number
}

export type SharedPost = {
  id: number
  text: string
  user: {
    id: number
    name: string
  }
}
