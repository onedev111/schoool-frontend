import * as user from 'User/api'
import * as post from 'Post/api'
import * as comment from 'Post/Comment/api'
import * as upload from 'Upload/api'
import * as classes from 'Class/api'
import * as constants from 'Constants/api'
import * as notebook from 'Notebook/api'
import * as studyFlow from 'Studyflow/api'
import { get } from 'utils/apiUtils'
import { getUserToken } from 'User/currentUser'

export default {
  user,
  post,
  comment,
  upload,
  classes,
  constants,
  notebook,
  studyFlow,

  app: {
    getCountsAndIsPremium: get(() => ({
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
    })),
  },
}
