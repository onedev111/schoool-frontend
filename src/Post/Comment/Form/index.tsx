import React from 'react'
import { Camera } from '@styled-icons/boxicons-regular/Camera'
import { observer } from 'mobx-react-lite'
import cn from 'classnames'
import { Smile } from '@styled-icons/fa-regular'
import { X } from '@styled-icons/boxicons-regular/X'
import useEmojiPicker from 'utils/useEmojiPicker'
import { useOnChangeSelectionRange } from 'utils/contentEditable'
import createCommentFormState from 'Post/Comment/Form/State'
import ContentEditable from 'Shared/Form/ContentEditable'
import submit from 'Post/Comment/Form/submit'
import { Post } from 'Post/types'
import Spin from 'assets/images/icons/Spin'
import { Comment } from 'Post/Comment/types'
import { imageMimes } from 'utils/imageUploadState'
import Alert from 'Shared/Modal/Alert'

type Props = {
  comment?: Partial<Comment>
  post: Post
  className?: string
  minHeight: number
  autoFocus?: boolean
  onSuccess?(comment: Comment): void
}

export default observer(function CommentForm({
  comment,
  post,
  className,
  minHeight,
  autoFocus,
  onSuccess,
}: Props) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [state] = React.useState(() =>
    createCommentFormState({ comment, editorRef }),
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<Error>()

  useOnChangeSelectionRange((range) => state.setSelectionRange(range))

  const toggleEmoji = useEmojiPicker({ state })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const comment = await submit({
        post,
        postOwnerId: post.user.id,
        editorRef,
        values: state.values,
      })
      state.reset()
      if (onSuccess) onSuccess(comment)
    } catch (err) {
      setError(err)
      state.reset()
    }
    setIsSubmitting(false)
  }

  return (
    <form className={cn('relative', className)} onSubmit={onSubmit}>
      {error && (
        <Alert title={error.message} onClose={() => setError(undefined)} />
      )}
      {state.imageUpload.warningModal}
      {state.imageUpload.dragArea}
      <div className="flex-grow">
        <ContentEditable
          placeholder="Write a comment"
          minHeight={minHeight}
          editorRef={state.editorRef}
          getValue={() => state.values.html}
          setValue={(html) => state.setHTML(html)}
          autoFocus={autoFocus}
        />
        {state.imageUpload.images.map((image, i) => {
          if (!image.url) return <React.Fragment key={i} />

          return (
            <div
              style={{ minWidth: '30px', minHeight: '30px' }}
              className="mb-4 mr-4 inline-block relative group shadow"
            >
              <button
                type="button"
                className="w-5 h-5 flex-center text-white absolute top-0 right-0 mt-2 mr-2"
                style={{ background: 'rgba(0, 0, 0, .3)' }}
                onClick={() => state.imageUpload.removeImage(image)}
              >
                <X size={20} />
              </button>
              <img
                src={image.url}
                alt="image link"
                style={{ maxHeight: '72px' }}
              />
            </div>
          )
        })}
        <div className="flex items-center">
          <label>
            <Camera
              className="text-gray-a4 cursor-pointer transition duration-200 hover:text-blue-primary"
              size={25}
            />
            <input
              hidden
              type="file"
              onChange={(e) => state.imageUpload.onChangeImage(e)}
              accept={imageMimes.join(',')}
            />
          </label>
          <button
            type="button"
            className="flex-center ml-2 js-emoji-button"
            onClick={toggleEmoji}
          >
            <Smile className="text-gray-a4" size={20} />
          </button>
        </div>
      </div>
      <button
        className={cn(
          'text-blue-primary text-lg flex-center',
          !state.canSubmit && 'opacity-25 cursor-default',
        )}
        disabled={!state.canSubmit}
      >
        {!isSubmitting && 'Post'}
        {isSubmitting && (
          <>
            <Spin className="animate-spin h-5 w-5 mr-3" />
            <span className="animate-pulse">Uploading</span>
          </>
        )}
      </button>
    </form>
  )
})
