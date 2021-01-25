import { del, get, post, put } from 'utils/apiUtils'
import {
  getCurrentUser,
  getCurrentUserId,
  getUserToken,
} from 'User/currentUser'
import { Class } from 'Class/types'
import * as uploadApi from 'Upload/api'
import { request } from 'utils/fetch'

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
  is_applied?: 0 | 1
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
    isOwn: item.status === 'owner',
    isJoined: item.status === 'member',
    completed: Boolean(item.completed),
    isApplied:
      item.is_applied !== undefined ? Boolean(item.is_applied) : undefined,
    owner: {
      id: item.owner_id,
      name: item.owner_name,
    },
  }
}

export const list = get(({ userId }: { userId?: number } = {}) => ({
  path: '/rest_class',
  params: {
    access_token: getUserToken(),
    user_id: userId || getCurrentUser().id,
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

export const updateName = put(
  ({ classId, name }: { classId: number; name: string }) => ({
    path: `/class/${classId}/name`,
    data: {
      access_token: getUserToken(),
      name,
    },
  }),
)

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
  (
    item: Omit<Class, 'id' | 'image'> & {
      image: { blob: Blob }
    },
  ) => ({
    path: '/class',
    data: {
      access_token: getUserToken(),
      name: item.name,
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
      const { image } = await update({ id, ...item, name: undefined })

      const result: Class = {
        id,
        ...item,
        image: image as string,
      }

      return result
    },
  }),
)

export const update = async ({
  id,
  name,
  description,
  isPublic,
  autoApprove,
  image,
}: Omit<Partial<Class>, 'id' | 'image'> & {
  id: number
  image?: { blob: Blob }
}): Promise<{ image?: string }> => {
  const promises: Promise<unknown>[] = []

  if (image) promises.push(updatePhoto({ classId: id, image }))
  if (name !== undefined) promises.push(updateName({ classId: id, name }))
  if (description !== undefined)
    promises.push(updateDescription({ classId: id, description }))
  if (isPublic !== undefined)
    promises.push(updateIsPublic({ classId: id, isPublic }))
  if (autoApprove !== undefined)
    promises.push(updateAutoApprove({ classId: id, autoApprove }))

  const result = await Promise.all(promises)

  if (image) return { image: result[0] as string }

  return {}
}

export const remove = del(({ classId }: { classId: number }) => ({
  path: `/class/${classId}`,
  params: {
    access_token: getUserToken(),
  },
}))

export const join = post(({ classId }: { classId: number }) => ({
  path: `/class/${classId}/application`,
  data: {
    access_token: getUserToken(),
  },
  response(res: { result_code: string }) {
    if (res.result_code === '04.04')
      throw new Error('You are not allowed to join this class')
  },
}))

export const cancelJoin = del(({ classId }: { classId: number }) => ({
  path: `/class/${classId}/application/${getCurrentUserId()}`,
  data: {
    access_token: getUserToken(),
  },
}))

export const search = get(
  ({
    query,
    limit,
    offset,
  }: {
    query: string
    limit: number
    offset: number
  }) => ({
    path: '/class/search',
    params: {
      access_token: getUserToken(),
      search_key: query,
      limit_posts: limit,
      num_of_posts: offset,
    },
    response({ data }: { data: ClassResponse[] }): Class[] {
      if (!data) throw new Error('Something went wrong')
      return data.map(mapClass)
    },
  }),
)

type Member = {
  name: string
  profile_image_dir: string
  user_id: number
}

export const members = get(({ classId }: { classId: number }) => ({
  path: `/class/${classId}/members`,
  params: {
    access_token: getUserToken(),
  },
  response({ data }: { data?: Member[] }) {
    if (!data) throw new Error('Something went wrong')

    return data.map((user) => ({
      id: user.user_id,
      name: user.name,
      avatar: user.profile_image_dir,
    }))
  },
}))

export const applicants = get(({ classId }: { classId: number }) => ({
  path: `/rest_class/${classId}/applicants`,
  params: {
    access_token: getUserToken(),
  },
  response(data: Member[]) {
    if (!data) throw new Error('Something went wrong')

    return data.map((user) => ({
      id: user.user_id,
      name: user.name,
      avatar: user.profile_image_dir,
    }))
  },
}))

export const approveJoinRequest = put(
  ({ classId, userId }: { classId: number; userId: number }) => ({
    path: `/class/${classId}/application/${userId}`,
    data: {
      access_token: getUserToken(),
    },
  }),
)

export const rejectJoinRequest = del(
  ({ classId, userId }: { classId: number; userId: number }) => ({
    path: `/class/${classId}/application/${userId}`,
    params: {
      access_token: getUserToken(),
    },
  }),
)

export const removeMember = del(
  ({ classId, userId }: { classId: number; userId: number }) => ({
    path: `/class/${classId}/member/${userId}`,
    params: {
      access_token: getUserToken(),
    },
  }),
)

export const nonMembers = get(
  ({
    classId,
    limit,
    offset,
    search,
  }: {
    classId: number
    limit: number
    offset: number
    search: string
  }) => ({
    path: `/class/${classId}/non_members`,
    params: {
      access_token: getUserToken(),
      limit_posts: limit,
      num_of_posts: offset,
      search_key: search,
    },
    response(res: {
      response_code: string
      data?: {
        user_id: number
        name: string
        profile_image_dir: string
        base_language: string
      }[]
    }) {
      if (!res.data) throw new Error('Something went wrong')

      return res.data.map((user) => ({
        id: user.user_id,
        name: user.name,
        avatar: user.profile_image_dir,
        language: user.base_language,
      }))
    },
  }),
)

export const sendInvite = post(
  ({ classId, userIds }: { classId: number; userIds: number[] }) => ({
    path: `/class/${classId}/invitees`,
    data: {
      access_token: getUserToken(),
      invitees: userIds,
    },
  }),
)
