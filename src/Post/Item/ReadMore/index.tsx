import React from 'react'
import useToggle from 'utils/useToggle'
import { Post } from 'Post/types'
import Modal from 'Shared/Modal'

type Props = {
  showFullText: boolean
  toggleShowFullText(): void
  post: Post
  textRef: React.MutableRefObject<null>
}

export default function ReadMore({
  showFullText,
  toggleShowFullText,
  post,
  textRef,
}: Props) {
  const [readMore, setReadMore] = React.useState(false)
  const [
    classMembersRestrictionModal,
    toggleClassMembersRestrictionModal,
  ] = useToggle()

  React.useEffect(() => {
    const listener = () => {
      const textEl = (textRef.current as unknown) as HTMLElement
      setReadMore(textEl.scrollHeight > textEl.offsetHeight)
    }
    listener()
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  if (!readMore) return null

  return (
    <>
      {classMembersRestrictionModal && (
        <Modal
          onClose={toggleClassMembersRestrictionModal}
          className="text-center"
        >
          <div className="mt-8 mb-2 text-lg">Join This Class</div>
          <div className="font-bold text-gray-02 mb-2 px-10">
            This post is only for class members. If you want to see this post
            more, please join this class.
          </div>
          <hr className="text-gray-bb" />
          <div className="flex-center">
            <button
              className="rounded-full bg-blue-primary text-white h-7 px-7 my-4 font-bold"
              onClick={toggleClassMembersRestrictionModal}
            >
              Okay
            </button>
          </div>
        </Modal>
      )}
      <button
        className="font-bold ml-5"
        onClick={
          post.joinedToClass
            ? toggleShowFullText
            : toggleClassMembersRestrictionModal
        }
      >
        {showFullText ? 'Show Less' : 'Read More'}
      </button>
    </>
  )
}
