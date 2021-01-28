import { getTextAndTagsFromEditor } from 'utils/tags'
import { Comment, InReplyTo } from 'Post/Comment/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import api from 'api'
import { addToCache } from 'Post/Comment/cacheActions'
import { updateCache } from 'Post/cacheActions'
import { Post } from 'Post/types'
import { UploadingImage } from 'utils/imageUploadState'

type Props = {
  post: Post
  editorRef: { current: HTMLDivElement | null }
  postOwnerId: number
  values: {
    image?: UploadingImage
    parentCommentId?: number
    inReplyTo?: InReplyTo
  }
}

export default async function submit({
  post,
  editorRef,
  postOwnerId,
  values: { image, parentCommentId, inReplyTo },
}: Props): Promise<Comment> {
  const { text, containsRepliedUserName } = getTextAndTagsFromEditor({
    editor: editorRef.current as HTMLDivElement,
  })

  const comment: Comment = {
    id: 0,
    postId: post.id,
    isMine: true,
    isUploading: true,
    user: getCurrentUser(),
    date: dayjs(),
    text,
    liked: false,
    likesCount: 0,
    image: image?.url,
    parentCommentId,
    inReplyTo: !containsRepliedUserName ? undefined : inReplyTo,
  }

  if (image?.isNew) {
    const urls = await api.upload.getUploadingUrls({ photoCount: 1 })
    const upload = urls.photos[0]

    await fetch(upload.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: image.file,
    }).then(() => (comment.image = upload.cdnUrl))
  }

  comment.id = await api.comment.create({
    comment,
    postOwnerId,
  })
  addToCache(comment)
  updateCache(post.id, { commentsCount: post.commentsCount + 1 })

  return comment
}
