import React from 'react'
import logo from 'assets/images/logo.svg'
import style from 'Home/style.module.css'
import { Comment } from '@styled-icons/fa-solid/Comment'
import { Post as PostType } from 'Post/types'
import cn from 'classnames'
import ReadMore from 'Post/ReadMore'
import useToggle from 'Shared/useToggle'
import Menu from 'Post/Menu'
import Like from 'Post/Like'
import { Check } from '@styled-icons/boxicons-regular/Check'
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'
import Notebook from 'assets/images/icons/notebook'
import CommentForm from 'Post/CommentForm'
import CommentsModal from 'Post/CommentsModal'
import Attachments from 'Post/Attachments'
import Spin from 'assets/images/icons/Spin'

type Props = {
  post: PostType
  uploading?: boolean
}

export default function Post({ post, uploading }: Props) {
  const textRef = React.useRef(null)
  const [showFullText, toggleShowFullText] = useToggle()
  const [openComments, toggleComments] = useToggle()

  return (
    <>
      {openComments && <CommentsModal post={post} onClose={toggleComments} />}
      <div className="bg-white shadow relative mb-5">
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
          {(uploading || post.error) && (
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
              src={logo}
              alt="logo"
              style={{ width: '60px', height: '60px' }}
              className="mr-3"
            />
            <div className="flex-grow">
              <div className="text-xl text-gray-02">Mark Kim</div>
              <div className="font-bold text-gray-b0 text-sm">
                Yesterday, 12:24 AM
              </div>
            </div>
          </div>

          <div
            ref={textRef}
            className={cn(
              `text-gray-02 mb-3`,
              style.text,
              !showFullText && style.clampedText,
            )}
          >
            {post.text}
          </div>

          <div className="flex items-end">
            <div className="flex-grow">
              <div className={`text-blue-primary uppercase mb-1 ${style.text}`}>
                Send to notebook
              </div>

              <div className={`text-gray-87 uppercase mb-1 ${style.text}`}>
                Sentences included in the note book sentences
              </div>

              <div
                className={`text-gray-87 uppercase mb-1 font-bold font-italic ${style.text}`}
              >
                모국어 번역 표현이 나옴. 이탤릭이고
              </div>
            </div>
            <div>
              <ReadMore
                showFullText={showFullText}
                toggleShowFullText={toggleShowFullText}
                post={post}
                textRef={textRef}
              />
            </div>
          </div>
        </div>

        <Attachments
          audioClass="px-5 pt-5"
          previewsClass="px-5 pt-5"
          imageClass="w-full mt-5"
          videoClass="mt-5"
          attachments={post}
        />

        <div
          style={{ height: '90px' }}
          className="border-b border-gray-d6 flex items-center justify-around px-8"
        >
          <Like />
          <button className="w-1/4 flex-center text-gray-5f transition duration-200">
            <Comment size={29} onClick={toggleComments} />
            <div className="text-lg ml-3">12</div>
          </button>
          <button className="w-1/4 text-center text-gray-5f transition duration-200">
            <Check size={40} />
          </button>
          <Menu
            post={post}
            button={({ onClick }) => (
              <Notebook
                className="text-gray-5f transition duration-200"
                onClick={onClick}
              />
            )}
            className="relative z-10 w-1/4 flex-center"
            notebookMenu
          />
        </div>

        <CommentForm className="pt-6 pb-3 pl-5 pr-8 flex-center" />
      </div>
    </>
  )
}
