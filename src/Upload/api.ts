import { get, post } from 'utils/apiUtils'
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
    domain = 'share',
    photoCount,
    soundCount,
    videoCount,
  }: {
    domain?: 'share' | 'users/profile'
    photoCount?: number
    soundCount?: number
    videoCount?: number
  }) => ({
    path: '/file_uploading_url',
    params: {
      access_token: getUserToken(),
      domain,
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

export type Voice = 'Matthew' | 'Joanna' | 'Brian' | 'Amy' | 'Ivy' | 'Kendra'
export const voices: Voice[] = [
  'Matthew',
  'Joanna',
  'Brian',
  'Amy',
  'Ivy',
  'Kendra',
]

type CreateLoopingAudioResponse = {
  result_code: string
  url: string
}

export const createLoopingAudio = post(
  ({ text, voices }: { text: string; voices: Voice[] }) => ({
    path: '/looping',
    data: {
      access_token: getUserToken(),
      targets: JSON.stringify(voices),
      text,
    },
    response(data: CreateLoopingAudioResponse): string {
      if (data.result_code !== '01.00') throw new Error('Something went wrong')
      return data.url
    },
  }),
)
