import { post, getMutation } from 'api/utils'

export default {
  user: {
    login: post(({ email, password }: { email: string; password: string }) => ({
      path: '/login',
      data: { email, password, type: 0, os: 2 },
      response: (data: { result_code: string }) => data,
    })),
    register: post(
      (data: { email: string; password: string; name: string }) => ({
        path: '/register',
        data: {
          ...data,
          os: 2,
        },
        response: (data: {
          result_code: string
          data?: { access_token: string }
        }) => data,
      }),
    ),
    forgotPassword: getMutation((params: { email: string }) => ({
      path: '/forgot_password',
      params,
      response(data: { result_code: string }) {
        if (data.result_code === '16.01') throw new Error('User not found')
        return data
      },
    })),
    // login: () => '/login',
    // register: () => '/register',
    // forgotPassword: () => '/forgot_password',
    // updateEnglishLevel: () => '/v1.3/update_eng_level',
    // updateProfileImage: () => '/update_profile_image',
    // updateName: () => '/update_user_name',
    // updateBio: () => '/v1.3/update_bio',
    // updateInstructorProfile: () => '/v1.2/update_instructor_profile',
  },
  // posts: {
  //   list: ({ offset, limit }: { limit?: number; offset?: number }) =>
  //     `/rest_share${params({ num_of_posts: offset, limit_posts: limit })}`,
  //   like: (id: number) => `/rest_share/${id}/like`,
  //   create: () => '/add_share_post',
  //   saveToNotebook: (id: number) =>
  //     `/set_share_notebook${params({ share_post_id: id })}`,
  //   removeFromNotebook: (id: number) =>
  //     `/unset_share_notebook${params({ share_post_id: id })}`,
  //   remove: (id: number) =>
  //     `/delete_share_post${params({ share_post_id: id })}`,
  //   comment: {
  //     list: (id: number) => `/get_share_reply${params({ share_post_id: id })}`,
  //     create: () => `/add_share_reply`,
  //   },
  // },
  // notebook: {
  //   list: () => '/notebook/sentence',
  //   create: () => '/notebook/sentence',
  // },
  // fileUploading: '/file_uploading_url',
}
