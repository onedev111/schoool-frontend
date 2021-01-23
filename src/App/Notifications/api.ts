import { get } from 'utils/apiUtils'
import { getUserToken } from 'User/currentUser'

export const list = get(({ limit = 20, offset = 0 }) => ({
  path: `/v1.4/get_notifications`,
  params: {
    access_token: getUserToken(),
    limit_posts: limit,
    num_of_posts: offset,
  },
  response(res: any) {
    console.log(res)
  },
}))
