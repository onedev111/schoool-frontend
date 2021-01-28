import { Dayjs } from 'dayjs'

export type Notification = {
  id: number
  message: string
  type: number
  createdBy: number
  createdAt: Dayjs
  isFollowing: boolean
  isOpen: boolean
  isRead: boolean
  name: string
  image: string
  readAt: Dayjs
  userId: number
  commentId?: number
  entityId?: number
}
