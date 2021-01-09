import React from 'react'
import { Link as LinkType } from 'Post/types'
import Audio from 'Post/Item/Audio'
import Video from 'Post/Item/Video'
import Link from 'Post/Item/Link'
import Photos from 'Post/Item/Attachments/Photos'
import useYouTubeState from 'utils/youTubeState'
import { observer } from 'mobx-react-lite'

type Props = {
  audioClass?: string
  previewsClass?: string
  imageClass?: string
  videoClass?: string
  attachments: {
    audio?: string
    loopingAudio?: string
    links?: LinkType[]
    images: string[]
    video?: string
    youtubeId?: string
  }
}

const YouTube = observer(({ youtubeId }: { youtubeId: string }) => {
  const { video } = useYouTubeState({ youtubeId })

  return video
})

export default function Attachments({
  audioClass,
  previewsClass,
  imageClass,
  videoClass,
  attachments: { audio, loopingAudio, links, images, video, youtubeId },
}: Props) {
  return (
    <>
      {(audio || loopingAudio) && (
        <>
          <div className={audioClass}>
            {(audio || loopingAudio) && (
              <div className="flex">
                {audio && <Audio src={audio} compact={Boolean(loopingAudio)} />}
                {loopingAudio && (
                  <Audio
                    src={loopingAudio}
                    loop
                    className={audio && 'ml-5'}
                    compact={Boolean(audio)}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}

      <Photos className={imageClass} images={images} />
      {links && links.length > 0 && (
        <div className={previewsClass}>
          {links?.map((link, i) => (
            <Link
              className={i !== 0 ? 'mt-4' : undefined}
              link={link}
              key={i}
            />
          ))}
        </div>
      )}

      {video && <Video video={video} className={videoClass} />}

      {youtubeId && <YouTube youtubeId={youtubeId} />}
    </>
  )
}
