import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import cn from 'classnames'
import useYouTube from 'Shared/useYouTube'

type Props = {
  youtubeId: string | null
  setYoutubeId(id: string | null): void
  onClose(): void
}

export default function YouTube({ youtubeId, setYoutubeId, onClose }: Props) {
  const [url, setUrl] = React.useState('')
  const { youtubeId: id, setYoutubeId: setId, video } = useYouTube({
    youtubeId,
    className: 'mt-10',
  })

  const onChange = async (url: string) => {
    setUrl(url)
    const id = new URLSearchParams(url.slice(url.indexOf('?'))).get('v')
    setId(id)
  }

  return (
    <div>
      <div className="border-b border-gray-c5">
        <button
          type="button"
          className="absolute top-0 left-0 text-gray-5f mt-8 ml-6"
          onClick={onClose}
        >
          <ArrowLeft size={26} />
        </button>
        <div className="text-2xl uppercase text-center pt-8 pb-6">
          Add YouTube video
        </div>
      </div>
      <div className="py-8 px-7">
        <input
          className="h-12 text-gray-45 px-4 border border-gray-97 rounded w-full"
          placeholder="Enter or paste Youtube video URL"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
        {video}
        <div className="flex-center mt-12">
          <button
            type="button"
            className={cn(
              'h-8 rounded-full bg-blue-primary text-white',
              !id && 'opacity-25',
            )}
            style={{ width: '200px' }}
            disabled={!id}
            onClick={() => {
              setYoutubeId(id)
              onClose()
            }}
          >
            Add Youtube Video
          </button>
        </div>
      </div>
    </div>
  )
}
