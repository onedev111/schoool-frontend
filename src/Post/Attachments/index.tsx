import React from 'react'
import { Preview as PreviewType, Video as VideoType } from 'Post/types'
import Audio from 'Post/Audio'
import Video from 'Post/Video'
import Preview from 'Post/Preview'
import Photos from 'Post/Attachments/Photos'

type Props = {
  audioClass?: string
  previewsClass?: string
  imageClass?: string
  videoClass?: string
  attachments: {
    audio?: string
    loopingAudio?: string
    previews?: PreviewType[]
    images: string[]
    video?: VideoType
  }
}

export default function Attachments({
  audioClass,
  previewsClass,
  imageClass,
  videoClass,
  attachments: { audio, loopingAudio, previews, images, video },
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
      {(previews as PreviewType[])?.length > 0 && (
        <div className={previewsClass}>
          {previews?.map((preview, i) => (
            <Preview
              className={i !== 0 ? 'mt-4' : undefined}
              preview={preview}
              key={i}
            />
          ))}
        </div>
      )}

      {video && <Video video={video} className={videoClass} />}
    </>
  )
}
