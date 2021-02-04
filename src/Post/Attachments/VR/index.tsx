import React from 'react'
import Fullscreen from 'Post/Attachments/Fullscreen'
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

export default function VR({ image, user, date, onClose }: Props) {
  const [loadedAFrame, setLoadedAFrame] = React.useState(false)
  const [imageDataUrl, setImageDataUrl] = React.useState<string | undefined>()

  React.useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    import('aframe').then(() => setLoadedAFrame(true))

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

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.drawImage(img, 0, 0, img.width, img.height)
    setImageDataUrl(canvas.toDataURL())
  }

  return (
    <Fullscreen user={user} date={date} onClose={onClose}>
      <div className="h-full a-scene-wrap">
        <img
          src={image}
          alt="vr image"
          onLoad={onImageLoad}
          hidden
          crossOrigin="anonymous"
        />
        {(!loadedAFrame || !imageDataUrl) && (
          <div className="flex-center h-full">
            <Spin className="w-10 h-10 text-gray-c5 animate-spin" />
          </div>
        )}
        {loadedAFrame && imageDataUrl && (
          <a-scene embedded>
            <a-sky src={imageDataUrl} />
          </a-scene>
        )}
      </div>
    </Fullscreen>
  )
}
