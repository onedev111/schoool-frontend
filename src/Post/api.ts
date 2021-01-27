import { del, get, post } from 'utils/apiUtils'
import { getCurrentUserId, getUserToken } from 'User/currentUser'
import {
  Post,
  SLectureItem,
  Tag,
  TagToInsert,
  TagType,
  UsefulExpression,
} from 'Post/types'
import dayjs, { Dayjs } from 'dayjs'
import { EnglishLevel } from 'User/types'

type PostResponse = {
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

type UsefulExpressionResponse = {
  check_like: 0 | 1
  comment_count: number
  date: string
  id: number
  level: EnglishLevel
  like_count: number
  name: string
  profile_image: string
  sentence: string
  translation: string
  user_id: number
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

const mapPost = ({
  post,
  userId,
}: {
  post: PostResponse
  userId: number
}): Post => {
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

  let classes: { id: number; name: string }[]
  if (post.class_ids && post.class_names) {
    const ids = post.class_ids.split(',').map((id) => parseInt(id))
    const names = post.class_names.split(',')

    classes = ids.map((id, index) => ({
      id,
      name: names[index],
    }))
  } else {
    classes = []
  }

  const sLectures: SLectureItem[] = [
    {
      text: post.s_lecture_first_content,
      link: post.s_lecture_first_link,
      image: post.s_lecture_first_photo_dir,
      audio: post.s_lecture_first_sound_dir,
    },
    {
      text: post.s_lecture_second_content,
      link: post.s_lecture_second_link,
      image: post.s_lecture_second_photo_dir,
      audio: post.s_lecture_second_sound_dir,
    },
    {
      text: post.s_lecture_third_content,
      link: post.s_lecture_third_link,
      image: post.s_lecture_third_photo_dir,
      audio: post.s_lecture_third_sound_dir,
    },
    {
      text: post.s_lecture_fourth_content,
      link: post.s_lecture_fourth_link,
      image: post.s_lecture_fourth_photo_dir,
      audio: post.s_lecture_fourth_sound_dir,
    },
  ].filter((item) => item.text && item.audio)

  return {
    id: post.share_post_id,
    isUploading: false,
    isPublic: Boolean(post.is_public),
    addedToSaved: Boolean(post.check_notebook),
    classes,
    joinedToClass: Boolean(post.class_joined),
    text: post.comment,
    isMine: post.user_id === userId,
    isClassOwner: post.class_owner === userId,
    isClassAdmin: post.class_admin === userId,
    isFollowing: Boolean(post.is_following),
    user: {
      id: post.user_id,
      name: post.name,
      avatar: post.profile_image_dir,
    },
    liked: Boolean(post.liked),
    likesCount: post.like_count,
    commentsCount: post.reply_count,
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
    date: dayjs(post.date).utc(),
    notebookSentence: post.title
      ? { text: post.title, translation: post.translated_title }
      : undefined,
    tags,
    zoomLink: post.zoom_link,
    sharedPost: !post.shared_share_id
      ? undefined
      : {
          id: post.shared_share_id,
          text: post.shared_comment,
          user: {
            id: post.shared_share_user_id,
            name: post.shared_share_user_name,
          },
        },
    sLecture: post.s_lecture_id
      ? {
          id: post.s_lecture_id,
          items: sLectures,
        }
      : undefined,
    isVR: Boolean(post.is_pano),
  }
}

export const list = get(
  ({
    classId,
    limit,
    offset,
  }: {
    classId?: number
    limit: number
    offset: number
  }) => ({
    path: classId ? `/rest_class/${classId}/post` : '/rest_share',
    params: {
      limit_posts: limit,
      num_of_posts: offset,
    },
    response: (
      data:
        | PostResponse[]
        | {
            data: PostResponse[]
            useful_expression: UsefulExpressionResponse[]
          },
    ): { posts: Post[]; usefulExpressions: UsefulExpression[] } => {
      const userId = getCurrentUserId()

      const posts = Array.isArray(data) ? data : data.data
      const usefulExpressions = Array.isArray(data)
        ? []
        : (data.useful_expression || []).map((item) => ({
            id: item.id,
            sentence: item.sentence,
            translation: item.translation,
            date: dayjs(item.date),
            level: item.level,
          }))

      return {
        posts: posts.map((post) => mapPost({ post, userId })),
        usefulExpressions,
      }
    },
  }),
)

export const listSaved = get(
  ({
    classId,
    limit,
    offset,
  }: {
    classId?: number
    limit: number
    offset: number
  }) => ({
    path: classId ? `/rest_class/${classId}/saved` : '/get_share_notebook',
    params: {
      access_token: getUserToken(),
      size: limit,
      start: offset,
    },
    response(data: PostResponse[] | { data: PostResponse[] }) {
      const userId = getCurrentUserId()
      const posts = Array.isArray(data) ? data : data.data
      return posts.map((post) => mapPost({ post, userId }))
    },
  }),
)

export const findById = get(({ id }: { id: number }) => ({
  path: '/get_share_by_post_id',
  params: {
    access_token: getUserToken(),
    share_post_id: id,
  },
  response({
    result_code,
    data: post,
  }: {
    result_code: string
    data: PostResponse
  }) {
    if (result_code !== '23.00') throw new Error('Something went wrong')

    return mapPost({ post, userId: getCurrentUserId() })
  },
}))

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

export const save = post(
  ({
    id,
    isPublic,
    classes = [],
    text,
    images = [],
    video,
    youtubeId,
    audio,
    loopingAudio,
    tags = [],
    notebookSentence,
    zoomLink,
    sharedPost,
  }: Partial<Post>) => ({
    path: id ? '/edit_share_post' : '/add_share_post',
    data: {
      share_post_id: id,
      access_token: getUserToken(),
      is_public: isPublic ? 1 : 0,
      class_ids: classes.map(({ id }) => id),
      comment: text,
      photo: images[0],
      photo_second: images[1],
      photo_third: images[2],
      photo_fourth: images[3],
      video: video || id ? -1 : undefined,
      youtube_id: youtubeId,
      sound: audio || id ? -1 : undefined,
      looping_url: loopingAudio,
      zoom_link: zoomLink || id ? '' : undefined,
      title: notebookSentence?.text,
      translated_title: notebookSentence?.translation,
      shared_share_id: sharedPost ? sharedPost.id : id ? -1 : undefined,
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
    response: (res: { result_code: string; data?: CreatePostResponse }) => {
      if (res.result_code !== '01.00' && res.result_code !== '02.00')
        throw new Error('Something went wrong')

      return res.data?.share_post_id
    },
  }),
)

export const remove = get(({ id }: { id: number }) => ({
  path: '/delete_share_post',
  params: {
    access_token: getUserToken(),
    share_post_id: id,
  },
  response({ result_code }: { result_code: string }) {
    if (result_code !== '03.00') throw new Error('Something went wrong')
  },
}))

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
      // include_studyflow: '1',
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

export const like = post(({ postId }: { postId: number }) => ({
  path: `/rest_share/${postId}/like`,
  response() {
    // noop
  },
}))

export const unlike = del(({ postId }: { postId: number }) => ({
  path: `/rest_share/${postId}/like`,
  response() {
    // noop
  },
}))

export const addToSaved = get(({ postId }: { postId: number }) => ({
  path: '/set_share_notebook',
  params: {
    access_token: getUserToken(),
    share_post_id: postId,
  },
}))

export const removeFromSaved = get(({ postId }: { postId: number }) => ({
  path: '/unset_share_notebook',
  params: {
    access_token: getUserToken(),
    share_post_id: postId,
  },
}))

export const userPosts = get(
  ({
    userId,
    search,
    limit,
    offset,
  }: {
    userId: number
    search?: string
    limit: number
    offset: number
  }) => ({
    path: search ? '/search_users_post' : '/v1.3/get_share_by_user_id',
    params: {
      access_token: getUserToken(),
      user_id: userId,
      search_key: search,
      limit_posts: limit,
      num_of_posts: offset,
    },
    response({ data }: { data: PostResponse[] }) {
      if (!data) throw new Error('Something went wrong')

      const userId = getCurrentUserId()
      return data.map((post) => mapPost({ post, userId }))
    },
  }),
)
