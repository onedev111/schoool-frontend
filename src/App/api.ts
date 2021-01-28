import { get } from 'utils/apiUtils'
import { getUserToken } from 'User/currentUser'

export const getCountsAndIsPremium = get(() => ({
  path: '/remember/is_ready',
  params: {
    access_token: getUserToken(),
  },
  response: (res: {
    notebook_count: number
    premium_enabled: number
    remember_count: number
  }) => ({
    notebookCount: res.notebook_count,
    isPremium: res.premium_enabled,
    rememberCount: res.remember_count,
  }),
}))

export const speech = get(({ text }: { text: string }) => ({
  path: '/speech',
  params: {
    access_token: getUserToken(),
    gender: 0,
    sentence: text,
  },
  response(res: { data?: string }): string {
    if (!res.data) throw new Error('Something went wrong')

    return res.data
  },
}))

type ConstantsResponse = {
  result_code: string
  languages: string[]
}

type Constants = {
  languages: string[]
}

export const getConstants = get(() => ({
  path: '/v1.2/get_app_constants',
  response: (data: ConstantsResponse): Constants => {
    if (data.result_code !== '21.00') throw new Error('Something went wrong')

    return {
      languages: data.languages,
    }
  },
}))
