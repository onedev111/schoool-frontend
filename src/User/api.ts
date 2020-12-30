import { post, getMutation } from 'Shared/apiUtils'
import { User } from './types'

type UserResponse = {
  user_id: number
  access_token: string
  name: string
  email: string
  gender: string
  profile_image_dir: string
  expression_points: string | number
  question_points: string | number
  activity_points: number
  base_language: string
  second_language: string
  instructor_initial: string
  instructor_theme: string | string[]
  is_instructor: string | number
  facebook_id?: string
  apple_id?: string
  instructor_profile?: string
  gdpr_agreed: number
  location: string
  organization: string
  user_type: number
  seen_tab_change_info: number
  school_seen_info: number
  finder_seen_info: number
  using_remember: number
  remember_notify_time: number
  remember_american: number
  class_based_info_seen: number
  classBasedPostExisting: number
  instructor_type?: string
  theme?: string
  city?: string
  country?: string
  checked_create_lecture?: number
  checked_instructor_page?: number
  unread_noti_count?: number
  obscene_check?: number
  should_see_notebook_update?: number
  add_share_notebook_update?: number
  seen_glass_notes_initial_info?: number
  premium_enabled?: number
  subscription_type?: number
  premium_expires?: number
  cancelled_renew?: number
  premium_platform?: number
}

const mapUser = (user: UserResponse): User => ({
  id: user.user_id,
  token: user.access_token,
  name: user.name,
  email: user.email,
  avatar: user.profile_image_dir,
})

export const login = post(
  ({ email, password }: { email: string; password: string }) => ({
    path: '/login',
    data: { email, password, type: '0', os: 2 },
    response: (data: { result_code: string; data: UserResponse }): User => {
      if (data.result_code === '01.03')
        throw new Error('Email or password is invalid')
      if (!data.data?.access_token) throw new Error('Something went wrong')
      return mapUser(data.data)
    },
  }),
)

export const register = post(
  (data: { email: string; password: string; name: string }) => ({
    path: '/register',
    data: {
      ...data,
      os: 2,
    },
    response: (data: { result_code: string; data: UserResponse }): User => {
      if (data.result_code === '02.01')
        throw new Error('User with such email already exists')
      if (data.result_code === '02.05')
        throw new Error('Username is restricted')
      if (data.result_code === '02.07') throw new Error('Password is too short')
      if (!data.data?.access_token) throw new Error('Something went wrong')
      return mapUser(data.data)
    },
  }),
)

export const forgotPassword = getMutation((params: { email: string }) => ({
  path: '/forgot_password',
  params,
  response(data: { result_code: string }) {
    if (data.result_code === '16.01') throw new Error('User not found')
    if (data.result_code === '16.02')
      throw new Error('Account is linked to facebook or apple')
    if (data.result_code !== '16.00') throw new Error('Something went wrong')
    return data
  },
}))
