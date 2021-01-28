import React from 'react'
import Fullscreen from 'Post/Attachments/Fullscreen'
import image from 'assets/images/image.jpg'
import { Dayjs } from 'dayjs'
import './style.css'
import Spin from 'assets/images/icons/Spin'

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line
      'a-scene': any
      // eslint-disable-next-line
      'a-sky': any
    }
  }
}

type Props = {
  user: { id: number; name: string }
  date: Dayjs
  image: string
  onClose(): void
}

export default function VR({ user, date, onClose }: Props) {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    import('aframe').then(() => setLoaded(true))

    const listener = () => {
      // eslint-disable-next-line
      const doc: any = document
      if (
        doc.fullScreenElement ||
        doc.webkitIsFullScreen ||
        doc.mozFullScreen ||
        doc.msFullscreenElement !== null
      ) {
        document.documentElement.classList.remove('a-fullscreen')
      }
    }
    if (document.addEventListener) {
      document.addEventListener('fullscreenchange', listener, false)
      document.addEventListener('mozfullscreenchange', listener, false)
      document.addEventListener('MSFullscreenChange', listener, false)
      document.addEventListener('webkitfullscreenchange', listener, false)
    }

    return () => {
      document.removeEventListener('fullscreenchange', listener, false)
      document.removeEventListener('mozfullscreenchange', listener, false)
      document.removeEventListener('MSFullscreenChange', listener, false)
      document.removeEventListener('webkitfullscreenchange', listener, false)
    }
  }, [])

  return (
    <Fullscreen user={user} date={date} onClose={onClose}>
      <div className="h-full a-scene-wrap">
        {!loaded && (
          <div className="flex-center h-full">
            <Spin className="w-10 h-10 text-gray-c5 animate-spin" />
          </div>
        )}
        {loaded && (
          <a-scene embedded>
            <a-sky
              // src={`${process.env.REACT_APP_API_URL}/url?${encodeURIComponent(
              //   image,
              // )}`}
              src={image}
            />
          </a-scene>
        )}
      </div>
    </Fullscreen>
  )
}
