import { makeAutoObservable } from 'mobx'
import { createImageUploadState, UploadingImage } from 'utils/imageUploadState'
import { getTaggedEditorHTML } from 'utils/tags'
import { Comment } from 'Post/Comment/types'

type Props = {
  comment?: Partial<Comment>
  editorRef: { current: HTMLDivElement | null }
}

export default function createCommentFormState({ comment, editorRef }: Props) {
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
    values,
    setHTML(html: string) {
      this.values.html = html
    },
    setImage(image: UploadingImage) {
      this.values.image = image
    },
    setSelectionRange(range?: Range) {
      this.selectionRange = range
    },
    reset() {
      this.imageUpload.reset()
      this.selectionRange = undefined
      if (this.editorRef.current) this.editorRef.current.innerHTML = ''
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
