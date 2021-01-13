import { Dayjs } from 'dayjs'

export type Comment = {
  id: number
  isUploading: boolean
  error?: Error
  postId: number
  isMine: boolean
  user: {
    id: number
    avatar: string
    name: string
  }
  date: Dayjs
  text: string
  liked: boolean
  likesCount: number
  image?: string
  video?: string
  file?: string
  audio?: string
  loopingAudio?: string
  parentCommentId?: number
  inReplyTo?: {
    id?: number
    user?: {
      id: number
      name: string
    }
  }
}
