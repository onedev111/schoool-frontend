import React from 'react'
import ClassMembersRestriction from 'Home/Post/Modals/ClassMembersRestriction'
import useToggle from 'Shared/useToggle'
import { Post } from 'Home/Post/types'

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
        <ClassMembersRestriction onClose={toggleClassMembersRestrictionModal} />
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
