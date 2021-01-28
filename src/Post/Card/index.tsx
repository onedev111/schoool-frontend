import React from 'react'
import style from 'Home/style.module.css'
import { Post as PostType } from 'Post/types'
import cn from 'classnames'
import ReadMore from 'Post/Card/ReadMore'
import useToggle from 'utils/useToggle'
import Menu from 'Post/Card/Menu'
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'
import CommentForm from 'Post/Comment/Form'
import Attachments from 'Post/Attachments'
import Spin from 'assets/images/icons/Spin'
import { formatDate } from 'utils/date'
import Text from 'Post/Text'
import PostBottomPanel from 'Post/Card/BottomPanel'
import CommentsModal from 'Post/Comment/Modal'
import PostTitle from 'Post/Card/Title'
import OnlyForMembersAlert from 'Post/Card/OnlyForMembersAlert'
import AddSentence from 'Notebook/AddSentence'

type Props = {
  post: PostType
  className?: string
  highlightedCommentId?: number
}

export default function Post({
  post,
  className,
  highlightedCommentId: initialHighlightedCommentId,
}: Props) {
  const textRef = React.useRef(null)
  const [showFullText, toggleShowFullText] = useToggle()
  const [showOnlyForMembersAlert, toggleOnlyForMembersAlert] = useToggle()
  const [openAddToNotebook, toggleAddToNotebook] = useToggle()
  const [openComments, setOpenComments] = React.useState(
    Boolean(initialHighlightedCommentId),
  )

  const toggleComments = () => setOpenComments(!openComments)

  const tryToOpenComments = () => {
    if (post.classes.length === 0 || post.joinedToClass) setOpenComments(true)
    else toggleOnlyForMembersAlert()
  }

  const [highlightedCommentId, setHighlightedCommentId] = React.useState(
    initialHighlightedCommentId,
  )

  return (
    <>
      {openAddToNotebook && (
        <AddSentence
          onClose={toggleAddToNotebook}
          title="Send to my notebook"
          buttonText="Add"
          contentClass="pt-4 px-5 pb-6"
          buttonWrapClass="flex-center mt-5"
          sentence={{
            text: post.notebookSentence?.text || post.text,
            translation: post.notebookSentence?.translation || '',
          }}
        />
      )}
      {openComments && (
        <CommentsModal
          post={post}
          onClose={toggleComments}
          highlightedCommentId={highlightedCommentId}
          setHighlightedCommentId={setHighlightedCommentId}
        />
      )}
      {showOnlyForMembersAlert && (
        <OnlyForMembersAlert onClose={toggleOnlyForMembersAlert} />
      )}
      <div
        className={cn(
          'bg-white shadow relative flex flex-col',
          className || 'mb-5',
        )}
      >
        <Menu
          post={post}
          button={({ onClick }) => (
            <button type="button" onClick={onClick}>
              <DotsHorizontalRounded size={24} />
            </button>
          )}
          className="absolute top-0 right-0 mt-8 mr-5"
        />

        <div className="px-5 pt-5">
          {(post.isUploading || post.error) && (
            <div
              className={cn(
                'flex-center mb-4',
                post.error ? 'text-red-600' : 'text-blue-primary',
              )}
            >
              {!post.error && <Spin className="animate-spin h-5 w-5 mr-3" />}
              <div
                className={cn(
                  'text-xl font-bold text-center',
                  !post.error && 'animate-pulse',
                )}
              >
                {post.error || 'Uploading'}
              </div>
            </div>
          )}

          <div className="flex-center mb-3">
            <img
              src={post.user.avatar}
              alt="avatar"
              style={{ width: '60px', height: '60px' }}
              className="mr-3 rounded-full"
            />
            <div className="flex-grow">
              <div className="text-gray-b0 text-sm">
                <PostTitle post={post} />
                {formatDate(post.date)}
              </div>
            </div>
          </div>

          <Text
            className="text-gray-02 mb-3"
            data={post}
            textRef={textRef}
            showFullText={showFullText}
          />

          <div className="flex items-end justify-end">
            {post.notebookSentence && (
              <div className="flex-grow">
                <button
                  type="button"
                  onClick={toggleAddToNotebook}
                  className={`text-blue-primary uppercase mb-1 ${style.text}`}
                >
                  Send to notebook
                </button>

                <div className={`text-gray-87 uppercase mb-1 ${style.text}`}>
                  {post.notebookSentence.text}
                </div>

                <div
                  className={`text-gray-87 uppercase mb-1 font-bold font-italic ${style.text}`}
                >
                  {post.notebookSentence.translation}
                </div>
              </div>
            )}
            <ReadMore
              showFullText={showFullText}
              toggleShowFullText={toggleShowFullText}
              post={post}
              textRef={textRef}
            />
          </div>
        </div>

        <Attachments
          audioClass="px-5 pt-5"
          linkClass="mx-5 mt-5"
          imageClass="w-full mt-5"
          videoClass="mt-5"
          attachments={post}
        />

        <PostBottomPanel
          post={post}
          toggleComments={tryToOpenComments}
          toggleAddToNotebook={toggleAddToNotebook}
        />

        <CommentForm
          post={post}
          className="pt-6 pb-3 pl-5 pr-8 flex-center"
          minHeight={28}
          onSuccess={(comment) => {
            setOpenComments(true)
            setHighlightedCommentId(comment.id)
          }}
        />
      </div>
    </>
  )
}
