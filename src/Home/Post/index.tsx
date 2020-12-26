import React from 'react'
import logo from 'assets/images/logo.svg'
import style from 'Home/style.module.css'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import { Comment } from '@styled-icons/fa-solid/Comment'
import { Check } from '@styled-icons/boxicons-regular/Check'
import Notebook from 'assets/images/icons/notebook'
import { Camera } from '@styled-icons/boxicons-regular/Camera'
import { Smile } from '@styled-icons/boxicons-regular/Smile'
import { Post as PostType } from './types'
import Audio from './Audio'
import cn from 'classnames'
import ReadMore from 'Home/Post/ReadMore'
import useToggle from 'Shared/useToggle'
import Preview from 'Home/Post/Preview'
import Video from 'Home/Post/Video'
import Menu from 'Home/Post/Menu'
import NotebookMenu from 'Home/Post/NotebookMenu'

type Props = {
  post: PostType
}

export default function Post({ post }: Props) {
  const textRef = React.useRef(null)
  const [showFullText, toggleShowFullText] = useToggle()

  return (
    <div className="bg-white shadow relative mb-5">
      <Menu />

      <div className="px-5 pt-5">
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
        {(post.audio || post.loopingAudio) && (
          <div className="mt-4">
            <div className="flex">
              {post.audio && (
                <Audio src={post.audio} compact={Boolean(post.loopingAudio)} />
              )}
              {post.loopingAudio && (
                <Audio
                  src={post.loopingAudio}
                  loop
                  className={post.audio && 'ml-5'}
                  compact={Boolean(post.audio)}
                />
              )}
            </div>
          </div>
        )}
        {post.previews.map((preview) => (
          <Preview className="mt-4" preview={preview} />
        ))}
      </div>

      {post.image && (
        <img src={post.image} alt="beer" className="w-full mt-5" />
      )}
      {post.video && <Video video={post.video} className="mt-5" />}

      <div
        style={{ height: '90px' }}
        className="border-b border-gray-d6 flex items-center justify-around px-8"
      >
        <button className="w-1/4 text-center text-gray-5f transition duration-200 hover:text-blue-primary">
          <Heart size={34} />
        </button>
        <button className="w-1/4 flex-center text-gray-5f transition duration-200 hover:text-blue-primary">
          <Comment size={29} />
          <div className="text-lg ml-3">12</div>
        </button>
        <button className="w-1/4 text-center text-gray-5f transition duration-200 hover:text-blue-primary">
          <Check size={40} />
        </button>
        <NotebookMenu />
      </div>

      <div className="pt-6 pb-3 pl-5 pr-8 flex-center">
        <div className="flex-grow">
          <textarea
            rows={1}
            className="resize-none focus:outline-none placeholder-gray-6b mb-2 w-full"
            placeholder="Write a comment"
          />
          <div>
            <Camera
              className="text-gray-a4 cursor-pointer transition duration-200 hover:text-blue-primary"
              size={25}
            />
            <Smile
              className="text-gray-a4 cursor-pointer transition duration-200 hover:text-blue-primary ml-2"
              size={25}
            />
          </div>
        </div>
        <div className="text-blue-primary opacity-25 text-lg">Post</div>
      </div>
    </div>
  )
}
