import React from 'react'
import cn from 'classnames'
import { X } from '@styled-icons/boxicons-regular/X'

type Props = {
  youtubeId?: string | null
  close?: boolean
  className?: string
}

const getVideoHeightFromId = async (id: string, el: HTMLElement) => {
  try {
    if (id) {
      const req = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}`,
      )
      if (req.headers.get('content-type') === 'application/json') {
        const data = await req.json()
        return el.getBoundingClientRect().width * (data.height / data.width)
      }
    }
  } catch (err) {
    // noop
  }
}

export default function useYouTube({
  youtubeId = null,
  close,
  className,
}: Props) {
  const ref = React.useRef(null)
  const [id, setId] = React.useState<string | null>(null)
  const [height, setHeight] = React.useState<number | null>(null)

  const setYoutubeId = async (id: string | null) => {
    if (id) {
      const height = await getVideoHeightFromId(
        id,
        (ref.current as unknown) as HTMLElement,
      )
      if (height) {
        setId(id)
        setHeight(height)
        return
      }
    }
    if (id !== null) setId(null)
  }

  React.useEffect(() => {
    setYoutubeId(youtubeId)
  }, [])

  return {
    youtubeId: id,
    setYoutubeId,
    youtubeVideoHeight: height,
    video: (
      <div ref={ref} className={cn('relative', className)}>
        {id && height && (
          <>
            {close && (
              <button
                type="button"
                className="w-10 h-10 flex-center text-white absolute top-0 right-0 mt-5 mr-7 bg-gray-6b"
                onClick={() => setId(null)}
              >
                <X size={28} />
              </button>
            )}
            <iframe
              width="99%"
              height={height}
              src={`https://www.youtube.com/embed/${id}?feature=oembed`}
              frameBorder="-1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </>
        )}
      </div>
    ),
  }
}
