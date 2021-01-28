import React from 'react'
import useToggle from 'utils/useToggle'
import { Post } from 'Post/types'
import { observer } from 'mobx-react-lite'
import OnlyForMembersAlert from 'Post/Card/OnlyForMembersAlert'

type Props = {
  showFullText: boolean
  toggleShowFullText(): void
  post: Post
  textRef: React.MutableRefObject<null>
}

export default observer(function ReadMore({
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
  }, [post.text, post.images, post.video, post.youtubeId])

  if (!readMore) return null

  return (
    <>
      {classMembersRestrictionModal && (
        <OnlyForMembersAlert onClose={toggleClassMembersRestrictionModal} />
      )}
      <button
        className="font-bold ml-5 whitespace-no-wrap"
        onClick={
          post.classes.length === 0 || post.joinedToClass
            ? toggleShowFullText
            : toggleClassMembersRestrictionModal
        }
      >
        {showFullText ? 'Show Less' : 'Read More'}
      </button>
    </>
  )
})
