import { State } from 'Post/Comment/Form/State'
import { getTextAndTagsFromEditor } from 'utils/tags'
import { Comment } from 'Post/Comment/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import api from 'api'
import CommentStore from 'Post/Comment/Store'

type Props = {
  state: State
}

export default async function submit({ state }: Props) {
  if (state.isSubmitting) return
  state.setIsSubmitting(true)

  const { image } = state.values

  const { text, tags } = getTextAndTagsFromEditor({
    editor: state.editorRef.current as HTMLDivElement,
  })

  const comment: Comment = {
    id: 0,
    postId: state.values.postId,
    isMine: true,
    isUploading: true,
    user: getCurrentUser(),
    date: dayjs(),
    text,
    liked: false,
    likesCount: 0,
    image: image?.url,
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
    CommentStore.addComment({ comment, highlight: true })
    state.reset()
  } catch (err) {
    state.setError(err)
  }
}
