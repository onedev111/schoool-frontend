import { Dayjs } from 'dayjs'
import { EnglishLevel } from 'User/types'

export type NotebookSentence = {
  text: string
  translation: string
}

export type SLecture = {
  id: number
  items: SLectureItem[]
}

export type SLectureItem = {
  text: string
  link: string
  image: string
  audio: string
}

export type Post = {
  id: number
  isUploading: boolean
  isPublic: boolean
  isVR: boolean
  addedToSaved: boolean
  classes: { id: number; name: string }[]
  text: string
  isMine: boolean
  isClassOwner: boolean
  isClassAdmin: boolean
  isFollowing: boolean
  user: {
    id: number
    name: string
    avatar: string
  }
  liked: boolean
  likesCount: number
  commentsCount: number
  images: string[]
  joinedToClass?: boolean
  audio?: string
  loopingAudio?: string
  image?: string
  video?: string
  youtubeId?: string
  date: Dayjs
  error?: string
  notebookSentence?: NotebookSentence
  tags: Tag[]
  zoomLink?: string
  sharedPost?: SharedPost
  sLecture?: SLecture
  link?: string
  studyFlow?: {
    id: number
    title: string
    username: string
  }
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

export type TagWithReply = Omit<Tag, 'type'> & { type: TagType | 'reply' }

export type UsefulExpression = {
  id: number
  sentence: string
  translation: string
  date: Dayjs
  level: EnglishLevel
}
