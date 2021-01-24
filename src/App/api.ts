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
