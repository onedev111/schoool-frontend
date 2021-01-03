import React from 'react'
import { Post } from 'Post/types'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import avatar from 'assets/images/avatar.svg'
import CommentForm from 'Post/CommentForm'
import { Comment } from 'Post/types'
import Comments from 'Post/CommentsModal/Comments'

type Props = {
  post: Post
  onClose(): void
}

const audio = '/t-rex-roar.mp3'

const comments: Comment[] = [
  {
    avatar,
    name: 'Mark Kim',
    date: new Date(),
    liked: 1,
    audio,
    loopingAudio: audio,
    image: '/beer.svg',
    video: {
      src: 'https://www.youtube.com/embed/lJIrF4YjHfQ',
      ratio: 315 / 560,
    },
    comment:
      'comment is written here. comment is written here. what you write is written here. comment is written here. what you write is written here.',
    previews: [
      {
        type: 'post',
        title:
          'If there’s title, title is shown here, but if not, begining part text is written here',
        text: 'Name of user who orginally posted',
      },
      {
        type: 'link',
        image: '/link-preview.svg',
        title:
          'website title is written here, body text is written here, up to two lines are written here',
        text: 'http://example.com',
      },
      {
        type: 'studyflow',
        title:
          'Title of studyflow is shown here, body text is written here, up to two lines are written here',
        text: 'Provided by user name',
      },
    ],
    comments: [
      {
        avatar,
        name: 'Mark Kim',
        date: new Date(),
        liked: 2,
        comment:
          'comment is written here. comment is written here. what you write is written here. comment is written here. what you write is written here.',
      },
      {
        avatar,
        name: 'Mark Kim',
        date: new Date(),
        liked: 3,
        comment:
          'comment is written here. comment is written here. what you write is written here. comment is written here. what you write is written here.',
      },
    ],
  },
  {
    avatar,
    name: 'Mark Kim',
    date: new Date(),
    liked: 4,
    comment:
      'comment is written here. comment is written here. what you write is written here. comment is written here. what you write is written here.',
  },
]

export default function CommentsModal({ post, onClose }: Props) {
  return (
    <Modal onClose={onClose} size="large">
      <div className="mt-8 mb-7 uppercase text-center text-2xl relative">
        <button onClick={onClose}>
          <X size={32} className="absolute top-0 right-0 mr-7 text-gray-5f" />
        </button>
        Comments
      </div>
      <div
        className="m-8 border border-gray-c5 pt-5 px-5 pb-4 shadow-md"
        style={{ borderRadius: '10px' }}
      >
        <div className="flex items-center">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-2 font-bold text-sm">Mark Kim</div>
        </div>
        <CommentForm className="pt-4 flex items-end" rows={3} />
      </div>
      <Comments comments={comments} />
    </Modal>
  )
}
