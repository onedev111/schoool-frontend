import { get } from 'utils/apiUtils'
import { getUserToken } from 'User/currentUser'
import { Notification } from 'App/Notifications/types'
import dayjs from 'dayjs'

type NotificationResponse = {
  comment_id: number
  created_by: number
  created_date: string
  is_following: 0 | 1
  is_open: 0 | 1
  is_read: 0 | 1
  name: string
  noti_id: number
  noti_msg: string
  noti_type: number
  post_id: number
  profile_image_dir: string
  read_date: string
  user_id: number
}

export const list = get(({ limit = 20, offset = 0 }) => ({
  path: `/v1.4/get_notifications`,
  params: {
    access_token: getUserToken(),
    limit_posts: limit,
    num_of_posts: offset,
  },
  response(res: { data?: NotificationResponse[] }): Notification[] {
    if (!res.data) throw new Error('Something went wrong')

    return res.data.map((item) => ({
      id: item.noti_id,
      message: item.noti_msg,
      type: item.noti_type,
      createdBy: item.created_by,
      createdAt: dayjs(item.created_date).utc(),
      isFollowing: Boolean(item.is_following),
      isOpen: Boolean(item.is_open),
      isRead: Boolean(item.is_read),
      name: item.name,
      image: item.profile_image_dir,
      readAt: dayjs(item.read_date).utc(),
      userId: item.user_id,
      commentId: item.comment_id || undefined,
      entityId: item.post_id || undefined,
    }))
  },
}))
