import { get } from 'Shared/apiUtils'
import { getUserToken } from 'User/currentUser'

type UploadUrls = {
  cdnUrl: string
  url: string
}

type UrlsResponse = {
  result_code: string
  data: UrlsData
}

type UrlsData = {
  photos: UploadUrls[]
  sounds: UploadUrls[]
  videos: UploadUrls[]
}

export const getUploadingUrls = get(
  ({
    photoCount,
    soundCount,
    videoCount,
  }: {
    photoCount?: number
    soundCount?: number
    videoCount?: number
  }) => ({
    path: '/file_uploading_url',
    params: {
      access_token: getUserToken(),
      domain: 'share',
      photo_count: photoCount,
      sound_count: soundCount,
      video_count: videoCount,
    },
    response: (data: UrlsResponse): UrlsData => {
      if (data.result_code !== '01.00') throw new Error('Something went wrong')
      return data.data
    },
  }),
)
