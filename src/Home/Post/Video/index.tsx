import React from 'react'
import { Video as VideoType } from 'Home/Post/types'

type Props = {
  video: VideoType
  className?: string
}

export default function Video({ video: { src, ratio }, className }: Props) {
  const ref = React.useRef(null)
  const [height, setHeight] = React.useState<number | null>(null)

  React.useEffect(() => {
    const div = (ref.current as unknown) as HTMLElement
    setHeight(div.getBoundingClientRect().width * ratio)
  }, [])

  return (
    <div ref={ref} className={className}>
      {height && (
        <iframe
          width="100%"
          height={height}
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}
