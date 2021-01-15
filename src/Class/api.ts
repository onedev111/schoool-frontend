import { get } from 'utils/apiUtils'
import { getCurrentUser, getUserToken } from 'User/currentUser'
import { Class } from 'Class/types'

type ClassResponse = {
  auto_approve: 0 | 1
  bio: string
  chat_room_id: number
  class_push_sent: string
  completed: 0 | 1
  date: string
  deletion_date: null | string
  id: number
  is_public: 0 | 1
  last_message_date: string
  live_allowed: 0 | 1
  live_chat_room_id: number
  live_main_link: string
  live_main_photo_first_dir: string
  live_main_photo_fourth_dir: string
  live_main_photo_second_dir: string
  live_main_photo_third_dir: string
  live_main_text: string
  live_url: string
  locked: 0 | 1
  message_disabled: 0 | 1
  name: string
  note_shared: string
  owner_id: number
  owner_name: string
  pinned_share_id: number
  post_show_type: number
  profile_image_dir: string
  qr_dark: string
  qr_light: string
  qr_only: string
  show_order: number
  status: 'member' | 'owner'
}

const mapClass = (item: ClassResponse): Class => {
  return {
    id: item.id,
    name: item.name,
    isPublic: Boolean(item.is_public),
    image: item.profile_image_dir,
    isOwner: item.status === 'owner',
    owner: {
      id: item.owner_id,
      name: item.owner_name,
    },
  }
}

export const list = get(() => ({
  path: '/rest_class',
  params: {
    access_token: getUserToken(),
    user_id: getCurrentUser().id,
  },
  response(res: {
    interested_classes: ClassResponse[]
    joined_classes: ClassResponse[]
    owning_classes: ClassResponse[]
    processing_classes: ClassResponse[]
  }): {
    joined: Class[]
    owning: Class[]
    processing: Class[]
  } {
    return {
      joined: res.joined_classes.map(mapClass),
      owning: res.owning_classes.map(mapClass),
      processing: res.processing_classes.map(mapClass),
    }
  },
}))

export const listRecommended = get(
  ({ limit, offset }: { limit: number; offset: number }) => ({
    path: '/rest_class/recommendation',
    params: {
      access_token: getUserToken(),
      limit_posts: limit,
      num_of_posts: offset,
    },
    response(
      classes: { id: number; name: string; profile_image_dir: string }[],
    ) {
      return classes.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.profile_image_dir,
      }))
    },
  }),
)
