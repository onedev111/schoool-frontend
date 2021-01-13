import { makeAutoObservable } from 'mobx'
import { createImageUploadState, UploadingImage } from 'utils/imageUploadState'
import { Post } from 'Post/types'

export type ReplyingComment = {
  id: number
  user: {
    id: number
    name: string
  }
}

type Props = {
  post: Post
  editorRef: { current: HTMLDivElement | null }
}

export default function createCommentFormState({ post, editorRef }: Props) {
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
    values: {
      postId: post.id,
      html: '',
      image: undefined as UploadingImage | undefined,
      replyingComment: undefined as ReplyingComment | undefined,
    },
    error: undefined as Error | undefined,
    setHTML(html: string) {
      this.values.html = html
    },
    setImage(image: UploadingImage) {
      this.values.image = image
    },
    setReplyingComment(comment: ReplyingComment) {
      this.values.replyingComment = comment
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
      return this.values.image || this.values.html.trim().length > 0
    },
  })

  return state
}

export type State = ReturnType<typeof createCommentFormState>
