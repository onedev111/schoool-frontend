import { makeAutoObservable } from 'mobx'
import { createImageUploadState, UploadingImage } from 'utils/imageUploadState'
import { Post } from 'Post/types'
import { getTaggedEditorHTML } from 'utils/tags'
import { Comment } from 'Post/Comment/types'

type Props = {
  comment?: Partial<Comment>
  post: Post
  editorRef: { current: HTMLDivElement | null }
}

export default function createCommentFormState({
  comment,
  post,
  editorRef,
}: Props) {
  const values = {
    parentCommentId: comment?.parentCommentId,
    inReplyTo: comment?.inReplyTo,
    html: getTaggedEditorHTML(comment),
    image: undefined as UploadingImage | undefined,
  }

  type Values = typeof values

  const state = makeAutoObservable({
    imageUpload: createImageUploadState({
      maxImagesCount: 1,
      onChange(images) {
        state.setImage(images[0])
      },
    }),
    editorRef,
    selectionRange: undefined as Range | undefined,
    isSubmitting: false,
    postOwnerId: post.user.id,
    post,
    values,
    error: undefined as Error | undefined,
    setHTML(html: string) {
      this.values.html = html
    },
    setImage(image: UploadingImage) {
      this.values.image = image
    },
    setSelectionRange(range?: Range) {
      this.selectionRange = range
    },
    setIsSubmitting(value: boolean) {
      if (value) this.error = undefined
      this.isSubmitting = value
    },
    setError(error?: Error) {
      this.error = error
      this.isSubmitting = false
    },
    reset() {
      this.imageUpload.reset()
      this.selectionRange = undefined
      if (this.editorRef.current) this.editorRef.current.innerHTML = ''
      this.isSubmitting = false
      this.error = undefined
      this.values.html = ''
    },
    get canSubmit() {
      const values = this.values as Values
      return values.image || values.html.trim().length > 0
    },
  })

  return state
}

export type State = ReturnType<typeof createCommentFormState>
