import { get, post } from 'Shared/apiUtils'
import { getCurrentUserId, getUserToken } from 'User/currentUser'
import { Post, Tag, TagToInsert, TagType } from 'Post/types'
import dayjs from 'dayjs'

type ListPostResponse = {
  base_language: string
  check_like: number
  check_notebook: number
  class_admin: number
  class_ids: string
  class_joined: number
  class_names: string
  class_owner: number
  comment: string
  date: string
  filtered_sound: string
  hashtag: string
  is_following: number
  is_instructor: number
  is_notification_following: number
  is_obscene: number
  is_pano: number
  is_public: number
  like_count: number
  liked: number
  link: string
  looping_url: string
  name: string
  photo_dir: string
  photo_dir_fifth: string
  photo_dir_fourth: string
  photo_dir_second: string
  photo_dir_third: string
  post_type: number
  preview_image: string
  preview_title: string
  profile_image_dir: string
  record_filter_type: number
  reply_count: number
  s_lecture_first_content: string
  s_lecture_first_link: string
  s_lecture_first_photo_dir: string
  s_lecture_first_sound_dir: string
  s_lecture_fourth_content: string
  s_lecture_fourth_link: string
  s_lecture_fourth_photo_dir: string
  s_lecture_fourth_sound_dir: string
  s_lecture_id: number
  s_lecture_notebook_sentence: string
  s_lecture_notebook_translation: string
  s_lecture_second_content: string
  s_lecture_second_link: string
  s_lecture_second_photo_dir: string
  s_lecture_second_sound_dir: string
  s_lecture_third_content: string
  s_lecture_third_link: string
  s_lecture_third_photo_dir: string
  s_lecture_third_sound_dir: string
  share_post_id: number
  shared_comment: string
  shared_flow_comment_id: number
  shared_flow_id: number
  shared_flow_title: string
  shared_flow_username: string
  shared_glass_id: number
  shared_lecture_id: number
  shared_lecture_title: string
  shared_lecture_user_name: string
  shared_lingo_comment_id: number
  shared_lingo_id: number
  shared_lingo_profile: string
  shared_lingo_topic: string
  shared_lingo_user_id: number
  shared_lingo_username: string
  shared_notebook_id: number
  shared_share_id: number
  shared_share_user_id: number
  shared_share_user_name: string
  shared_title: string
  sound_dir: string
  sound_for_lecture: number
  tagged_class_ids: string
  tagged_class_ranges: string
  tagged_flow_ids: string
  tagged_flow_ranges: string
  tagged_user_ids: string
  tagged_user_ranges: string
  theme: string
  title: string
  translated_title: string
  user_id: number
  video: string
  youtube_id: string
  zoom_link: string
}

const getTagsFromResponse = (type: TagType, ids = '', ranges = '') => {
  const parsedRanges = ranges
    .split('|')
    .filter((text) => text)
    .map((text) => {
      const arr = text.split(',')
      return {
        start: parseInt(arr[0]),
        length: parseInt(arr[1]),
      }
    })
  return ids
    .split(',')
    .filter((id, i) => id && parsedRanges[i])
    .map(
      (idString, i): Tag => ({
        id: parseInt(idString),
        type,
        start: parsedRanges[i].start,
        length: parsedRanges[i].length,
      }),
    )
}

export const list = get(
  ({ limit, offset }: { limit: number; offset: number }) => ({
    path: '/rest_share',
    params: {
      limit_posts: limit,
      num_of_posts: offset,
    },
    response: (data: { data: ListPostResponse[] }): Post[] => {
      const userId = getCurrentUserId()

      return data.data.map((post) => {
        const tags: Tag[] = [
          ...getTagsFromResponse(
            'user',
            post.tagged_user_ids,
            post.tagged_user_ranges,
          ),
          ...getTagsFromResponse(
            'class',
            post.tagged_class_ids,
            post.tagged_class_ranges,
          ),
          ...getTagsFromResponse(
            'studyflow',
            post.tagged_flow_ids,
            post.tagged_flow_ranges,
          ),
        ].sort((a, b) => (a.start > b.start ? 1 : -1))

        return {
          id: post.share_post_id,
          text: post.comment,
          isMine: post.user_id === userId,
          user: {
            id: post.user_id,
            name: post.name,
            avatar: post.profile_image_dir,
          },
          liked: Boolean(post.liked),
          likesCount: post.like_count,
          repliesCount: post.reply_count,
          saved: Boolean(post.check_notebook),
          images: [
            post.photo_dir,
            post.photo_dir_second,
            post.photo_dir_third,
            post.photo_dir_fourth,
          ].filter((image) => image),
          video: post.video,
          youtubeId: post.youtube_id,
          audio: post.sound_dir,
          loopingAudio: post.looping_url,
          previews: [],
          date: dayjs(`${post.date} UTC`),
          notebookSentence: post.title
            ? { text: post.title, translation: post.translated_title }
            : undefined,
          tags,
        }
      })
    },
  }),
)

type CreatePostResponse = {
  comment: string
  filtered_sound: string
  hashtag: string
  is_obscene: number
  is_pano: number
  is_public: number
  link: string
  looping_url: string
  photo_dir: string
  photo_dir_fifth: string
  photo_dir_fourth: string
  photo_dir_second: string
  photo_dir_third: string
  post_type: number
  preview_image: string
  preview_title: string
  record_filter_type: string
  share_post_id: number
  shared_flow_id: number
  shared_flow_title: string
  shared_lecture_id: number
  shared_lingo_id: number
  shared_share_id: number
  sound_dir: string
  sound_for_lecture: number
  tagged_class_ids: string
  tagged_class_ranges: string
  tagged_flow_ids: string
  tagged_flow_ranges: string
  tagged_user_ids: string
  tagged_user_ranges: string
  theme: string
  title: string
  translated_title: string
  user_id: number
  video: string
  youtube_id: string
  zoom_link: string
}

const makeTagsParams = (
  tags: Tag[],
  type: TagType,
  ids: string,
  ranges: string,
) => {
  const filtered = tags.filter((tag) => tag.type === type)

  return {
    [ids]: filtered.map((tag) => tag.id).join(','),
    [ranges]: filtered.map((tag) => `${tag.start},${tag.length}`).join('|'),
  }
}

export const create = post(
  ({
    text,
    images = [],
    video,
    youtubeId,
    audio,
    loopingAudio,
    tags = [],
  }: Partial<Post>) => ({
    path: '/add_share_post',
    data: {
      access_token: getUserToken(),
      is_public: 0,
      comment: text,
      photo: images[0],
      photo_second: images[1],
      photo_third: images[2],
      photo_fourth: images[3],
      video,
      youtube_id: youtubeId,
      sound: audio,
      looping_url: loopingAudio,
      ...makeTagsParams(tags, 'user', 'tagged_user_ids', 'tagged_user_ranges'),
      ...makeTagsParams(
        tags,
        'class',
        'tagged_class_ids',
        'tagged_class_ranges',
      ),
      ...makeTagsParams(
        tags,
        'studyflow',
        'tagged_flow_ids',
        'tagged_flow_ranges',
      ),
    },
    response: (data: { result_code: string; data: CreatePostResponse }) => {
      if (data.result_code !== '01.00') throw new Error('Something went wrong')
    },
  }),
)

type SearchTagsResponse = {
  result_code: string
  data: {
    id: number
    name: string
    priority: number
    profile_image_dir: string
    subpriority: number
    type: number
  }[]
}

export const searchTags = get(
  ({
    search,
    limit = 20,
    offset = 0,
  }: {
    search: string
    limit?: number
    offset?: number
  }) => ({
    path: '/search_user_class_for_tag',
    params: {
      access_token: getUserToken(),
      include_studyflow: '1',
      limit_posts: limit,
      num_of_posts: offset,
      search_key: search,
    },
    response(res: SearchTagsResponse): TagToInsert[] {
      if (res.result_code !== '33.00') throw new Error('Something went wrong')

      return res.data.map((tag) => ({
        id: tag.id,
        name: tag.name,
        image: tag.profile_image_dir,
        type: tag.type === 1 ? 'user' : tag.type === 2 ? 'class' : 'studyflow',
      }))
    },
  }),
)
