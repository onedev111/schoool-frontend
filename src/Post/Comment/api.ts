import { get, post } from 'utils/apiUtils'
import { getCurrentUserId, getUserToken } from 'User/currentUser'
import { Comment } from 'Post/Comment/types'
import dayjs from 'dayjs'

type CommentResponse = {
  actual_reply_id: number
  check_like: number
  comment: string
  date: string
  emoticon: number
  emoticon_id: number | null
  emoticon_name: string | null
  file_dir: string
  followers: number
  following: number
  is_following: number
  is_instructor: number
  is_like: number
  like_count: number
  looping_url: string
  name: string
  number: number | null
  path: string | null
  photo_dir: string
  pinned: number
  profile_image_dir: string
  reply_id: number
  reply_user_id: number
  reply_user_name: string
  share_post_id: number
  sound_dir: string
  tagged_class_ids: string
  tagged_class_ranges: string
  tagged_flow_ids: string
  tagged_flow_ranges: string
  tagged_user_ids: string
  tagged_user_ranges: string
  top_reply_id: number
  user_id: number
  video_dir: string
}

export const list = get(({ postId }: { postId: number }) => ({
  path: '/get_share_reply',
  params: {
    access_token: getUserToken(),
    share_post_id: postId,
  },
  response(res: { result_code: string; data: CommentResponse[] }): Comment[] {
    if (res.result_code !== '10.00') throw new Error('Something went wrong')

    const currentUserId = getCurrentUserId()

    return res.data.map((comment) => ({
      id: comment.reply_id,
      isUploading: false,
      postId: comment.share_post_id,
      user: {
        id: comment.user_id,
        avatar: comment.profile_image_dir,
        name: comment.name,
      },
      parentCommentId:
        comment.top_reply_id === -1 ? undefined : comment.top_reply_id,
      inReplyTo: {
        id:
          comment.actual_reply_id === -1 ? undefined : comment.actual_reply_id,
        user:
          comment.reply_user_id && comment.reply_user_name
            ? { id: comment.reply_user_id, name: comment.reply_user_name }
            : undefined,
      },
      isMine: comment.user_id === currentUserId,
      text: comment.comment,
      date: dayjs(comment.date).utc(),
      liked: Boolean(comment.check_like),
      likesCount: comment.like_count,
      image: comment.photo_dir || undefined,
      video: comment.video_dir || undefined,
      file: comment.file_dir || undefined,
      audio: comment.sound_dir || undefined,
      loopingAudio: comment.looping_url || undefined,
    }))
  },
}))

export const create = post(
  ({ comment, postOwnerId }: { comment: Comment; postOwnerId: number }) => ({
    path: '/add_share_reply',
    data: {
      access_token: getUserToken(),
      share_post_id: comment.postId,
      post_owner_id: postOwnerId,
      comment: comment.text,
      photo: comment.image,
      replying_to: comment.inReplyTo?.user?.id,
      top_reply_id: comment.parentCommentId || -1,
      actual_reply_id: comment.inReplyTo?.id,
    },
    response({
      result_code,
      data,
    }: {
      result_code: string
      data: { reply_id: number }
    }): number {
      if (result_code !== '07.00') throw new Error('Something went wrong')
      return data.reply_id
    },
  }),
)

export const like = get(
  ({ postOwnerId, commentId }: { postOwnerId: number; commentId: number }) => ({
    path: '/set_share_reply_like',
    params: {
      access_token: getUserToken(),
      post_owner_id: postOwnerId,
      share_reply_id: commentId,
    },
    response({ result_code }: { result_code: string }) {
      if (result_code !== '18.00') throw new Error('Something went wrong')
    },
  }),
)

export const unlike = get(
  ({ postOwnerId, commentId }: { postOwnerId: number; commentId: number }) => ({
    path: '/unset_share_reply_like',
    params: {
      access_token: getUserToken(),
      post_owner_id: postOwnerId,
      share_reply_id: commentId,
    },
    response({ result_code }: { result_code: string }) {
      if (result_code !== '19.00') throw new Error('Something went wrong')
    },
  }),
)
