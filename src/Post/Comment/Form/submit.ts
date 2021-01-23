import { State } from 'Post/Comment/Form/State'
import { getTextAndTagsFromEditor } from 'utils/tags'
import { Comment } from 'Post/Comment/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import api from 'api'
import { addToCache } from 'Post/Comment/actions'

type Props = {
  state: State
  onSuccess?(comment: Comment): void
}

export default async function submit({ state, onSuccess }: Props) {
  if (state.isSubmitting) return
  state.setIsSubmitting(true)

  const { post } = state
  const { image } = state.values

  const { text, containsRepliedUserName } = getTextAndTagsFromEditor({
    editor: state.editorRef.current as HTMLDivElement,
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
    parentCommentId: state.values.parentCommentId,
    inReplyTo: !containsRepliedUserName ? undefined : state.values.inReplyTo,
  }

  if (image?.isNew) {
    const urls = await api.upload.getUploadingUrls({ photoCount: 1 })
    try {
      const upload = urls.photos[0]

      await fetch(upload.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: image.file,
      }).then(() => (comment.image = upload.cdnUrl))
    } catch (err) {
      state.setError(err)
      return
    }
  }

  try {
    comment.id = await api.comment.create({
      comment,
      postOwnerId: state.postOwnerId,
    })
    addToCache(comment)
    post.commentsCount++
    state.reset()
    if (onSuccess) onSuccess(comment)
  } catch (err) {
    state.setError(err)
  }
}
