import { Dayjs } from 'dayjs'

export type NotebookSentence = {
  text: string
  translation: string
}

export type SLecture = {
  text: string
  link: string
  image: string
  audio: string
}

export type Post = {
  id: number
  isUploading: boolean
  isPublic: boolean
  addedToSaved: boolean
  classes: { id: number; name: string }[]
  text: string
  isMine: boolean
  isClassOwner: boolean
  isClassAdmin: boolean
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
  reachedNotebookLimit?: boolean
  date: Dayjs
  error?: string
  notebookSentence?: NotebookSentence
  tags: Tag[]
  zoomLink?: string
  sharedPost?: SharedPost
  sLectureId?: number
  sLectures: SLecture[]
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
