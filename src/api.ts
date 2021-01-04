import * as user from 'User/api'
import * as post from 'Post/api'
import * as fileUpload from 'FileUpload/api'

export default {
  user,
  post,
  fileUpload,
  // updateEnglishLevel: () => '/v1.3/update_eng_level',
  // updateProfileImage: () => '/update_profile_image',
  // updateName: () => '/update_user_name',
  // updateBio: () => '/v1.3/update_bio',
  // updateInstructorProfile: () => '/v1.2/update_instructor_profile',
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
