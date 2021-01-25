import React from 'react'
import Audio from 'Post/Item/Audio'
import Video from 'Post/Item/Video'
import Photos from 'Post/Attachments/Photos'
import useYouTubeState from 'utils/youTubeState'
import { observer } from 'mobx-react-lite'
import ZoomLink from 'Post/Attachments/Link/ZoomLink'
import { SharedPost } from 'Post/types'
import SharedPostLink from 'Post/Attachments/Link/SharedPostLink'
import File from 'Post/Attachments/File'
import useToggle from 'utils/useToggle'
import VR from 'Post/Attachments/VR'
import { Dayjs } from 'dayjs'
import vrIcon from 'assets/images/360.png'

type Props = {
  audioClass?: string
  linkClass?: string
  imageClass?: string
  videoClass?: string
  fileClass?: string
  attachments: {
    audio?: string
    loopingAudio?: string
    images: string[]
    video?: string
    youtubeId?: string
    zoomLink?: string
    sharedPost?: SharedPost
    file?: string
    isVR?: boolean
    date: Dayjs
    user: {
      id: number
      name: string
    }
  }
}

const YouTube = observer(({ youtubeId }: { youtubeId: string }) => {
  const { video } = useYouTubeState({ youtubeId })

  return video
})

export default function Attachments({
  audioClass,
  linkClass,
  imageClass,
  videoClass,
  fileClass,
  attachments: {
    audio,
    loopingAudio,
    images,
    video,
    youtubeId,
    zoomLink,
    sharedPost,
    file,
    isVR,
    date,
    user,
  },
}: Props) {
  const [openVR, toggleVR] = useToggle()

  return (
    <>
      {openVR && (
        <VR image={images[0]} onClose={toggleVR} user={user} date={date} />
      )}
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

      {sharedPost && (
        <SharedPostLink sharedPost={sharedPost} className={linkClass} />
      )}

      {zoomLink && <ZoomLink zoomLink={zoomLink} className={linkClass} />}

      {file && <File file={file} className={fileClass} />}

      {!isVR && (
        <Photos
          className={imageClass}
          images={images}
          user={user}
          date={date}
        />
      )}
      {isVR && images[0] && (
        <button
          type="button"
          className="flex-center w-full relative"
          onClick={() => toggleVR()}
        >
          <img src={images[0]} className="max-w-full" alt="vr image" />
          <img
            src={vrIcon}
            className="absolute right-0 bottom-0 mr-5 mb-5"
            alt="open vr view"
          />
        </button>
      )}

      {video && <Video video={video} className={videoClass} />}

      {youtubeId && (
        <div className={videoClass}>
          <YouTube youtubeId={youtubeId} />
        </div>
      )}
    </>
  )
}
