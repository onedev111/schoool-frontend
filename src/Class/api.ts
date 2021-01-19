import { del, get, post, put } from 'utils/apiUtils'
import { getCurrentUser, getUserToken } from 'User/currentUser'
import { Class } from 'Class/types'
import * as uploadApi from 'Upload/api'
import { request } from 'utils/fetch'
import { getUser } from 'User/api'

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
    description: item.bio,
    isPublic: Boolean(item.is_public),
    isLocked: Boolean(item.locked),
    autoApprove: Boolean(item.auto_approve),
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

export const getClass = get(({ id }: { id: number }) => ({
  path: `/rest_class/${id}`,
  params: {
    access_token: getUserToken(),
  },
  response(item: ClassResponse): Class {
    return mapClass(item)
  },
}))

export const updatePhoto = async ({
  classId,
  image,
}: {
  classId: number
  image: { blob: Blob }
}) => {
  const urls = await uploadApi.getUploadingUrls({ photoCount: 1 })
  const upload = urls.photos[0]

  await uploadApi.upload({ url: upload.url, data: image.blob })

  await request({
    method: 'PUT',
    path: `/rest_class/${classId}/photo`,
    data: {
      access_token: getUserToken(),
      photoPath: upload.cdnUrl,
    },
  })

  return upload.cdnUrl
}

export const updateDescription = put(
  ({ classId, description }: { classId: number; description: string }) => ({
    path: `/class/${classId}/bio`,
    data: {
      access_token: getUserToken(),
      bio: description,
    },
  }),
)

export const updateIsPublic = put(
  ({ classId, isPublic }: { classId: number; isPublic: boolean }) => ({
    path: `/class/${classId}/public`,
    data: {
      access_token: getUserToken(),
      is_public: isPublic ? 1 : 0,
    },
  }),
)

export const updateAutoApprove = put(
  ({ classId, autoApprove }: { classId: number; autoApprove: boolean }) => ({
    path: `/class/${classId}/autoapprove`,
    data: {
      access_token: getUserToken(),
      auto_approve: autoApprove ? 1 : 0,
      notify: 0,
    },
  }),
)

export const create = post(
  ({
    name,
    description,
    isPublic,
    isLocked,
    autoApprove,
    image: uploadingImage,
  }: Omit<Class, 'id' | 'isOwner' | 'image' | 'owner'> & {
    image: { blob: Blob }
  }) => ({
    path: '/class',
    data: {
      access_token: getUserToken(),
      name,
    },
    async response({
      result_code,
      data,
    }: {
      result_code: string
      data: { id: number }
    }) {
      if (result_code !== '01.00') throw new Error('Something went wrong')

      const { id } = data

      const promises: [
        Promise<string>,
        Promise<void>,
        Promise<void>,
        Promise<void>,
      ] = [
        updatePhoto({ classId: id, image: uploadingImage }),
        updateDescription({ classId: id, description }),
        updateIsPublic({ classId: id, isPublic }),
        updateAutoApprove({ classId: id, autoApprove }),
      ]

      const [image] = await Promise.all(promises)

      const item: Class = {
        id,
        name,
        description,
        isPublic,
        isLocked,
        autoApprove,
        isOwner: true,
        image,
        owner: getCurrentUser(),
      }

      return item
    },
  }),
)

export const join = post(({ classId }: { classId: number }) => ({
  path: `/class/${classId}/application`,
  data: {
    access_token: getUserToken(),
  },
}))

export const cancelJoin = del(({ classId }: { classId: number }) => ({
  path: `/class/${classId}/application`,
  data: {
    access_token: getUserToken(),
  },
}))
