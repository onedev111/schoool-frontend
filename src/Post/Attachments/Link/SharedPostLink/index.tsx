import React from 'react'
import Link from 'Post/Attachments/Link/index'
import postLinkImage from 'assets/images/post-link.svg'
import { SharedPost } from 'Post/types'
import PostModal from 'Post/Attachments/Link/SharedPostLink/Modal'
import useToggle from 'utils/useToggle'

type Props = {
  sharedPost: SharedPost
  className?: string
  onDelete?(): void
}

export default function SharedPostLink({
  sharedPost,
  className,
  onDelete,
}: Props) {
  const [isModalOpen, toggleModal] = useToggle()

  return (
    <>
      {isModalOpen && (
        <PostModal postId={sharedPost.id} onClose={toggleModal} />
      )}
      <Link
        onClick={toggleModal}
        className={className}
        image={
          <img
            src={postLinkImage}
            alt="Link to post"
            style={{ width: '70px', height: '70px' }}
          />
        }
        title={sharedPost.text}
        text={sharedPost.user.name}
        onDelete={onDelete}
      />
    </>
  )
}
