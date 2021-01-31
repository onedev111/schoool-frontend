import { get } from 'utils/apiUtils'
import { getCurrentUserId, getUserToken } from 'User/currentUser'
import { PostResponse, mapPost } from 'Post/api'

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

export const globalSearch = get(
  ({
    search,
    limit,
    offset,
  }: {
    search: string
    limit: number
    offset: number
  }) => ({
    path: '/v1.4/search_in_words',
    params: {
      access_token: getUserToken(),
      search_key: search,
      limit_posts: limit,
      num_of_posts: offset,
    },
    response({ data }: { data?: (PostResponse & { post_type: number })[] }) {
      if (!data) throw new Error('Something went wrong')

      const userId = getCurrentUserId()
      return data
        .filter((post) => post.post_type === 0)
        .map((post) => mapPost({ post, userId }))
    },
  }),
)
