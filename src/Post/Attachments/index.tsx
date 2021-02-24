import React from 'react'
import Audio from 'Post/Card/Audio'
import Video from 'Post/Card/Video'
import Photos from 'Post/Attachments/Photos'
import useYouTubeState from 'utils/youTubeState'
import { observer } from 'mobx-react-lite'
import ZoomLink from 'Post/Attachments/Link/ZoomLink'
import { SharedPost, SLecture } from 'Post/types'
import SharedPostLink from 'Post/Attachments/Link/SharedPostLink'
import File from 'Post/Attachments/File'
import useToggle from 'utils/useToggle'
import VR from 'Post/Attachments/VR'
import { Dayjs } from 'dayjs'
import vrIcon from 'assets/images/360.png'
import sLectureIcon from 'assets/images/slecture.png'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import SLecturePage from './SLecture'
import WebSiteLink from 'Post/Attachments/Link/WebSiteLink'
import StudyFlowLink from 'Post/Attachments/Link/StudyFlowLink'

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
    link?: string
    sharedPost?: SharedPost
    file?: string
    isVR?: boolean
    date: Dayjs
    user: {
      id: number
      name: string
      avatar: string
    }
    sLecture?: SLecture
    studyFlow?: {
      id: number
      title: string
      username: string
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
    link,
    sharedPost,
    file,
    isVR,
    date,
    user,
    sLecture,
    studyFlow,
  },
}: Props) {
  const [openVR, toggleVR] = useToggle()
  const [openSLecture, toggleSLecture] = useToggle()

  return (
    <>
      {openSLecture && sLecture && (
        <SLecturePage
          user={user}
          sLecture={sLecture}
          onClose={toggleSLecture}
        />
      )}
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

      {link && <WebSiteLink link={link} className={linkClass} />}

      {studyFlow && (
        <StudyFlowLink studyFlow={studyFlow} className={linkClass} />
      )}

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
          {/*<img src={images[0]} className="max-w-full" alt="vr image" />*/}
          <img
            src={vrIcon}
            className="absolute right-0 bottom-0 mr-5 mb-5"
            alt="open vr view"
          />
        </button>
      )}

      {sLecture && (
        <button
          type="button"
          className="flex-center w-full relative"
          onClick={() => toggleSLecture()}
        >
          <img
            src={sLecture.items[0]?.image || sLectureIcon}
            className="max-w-full"
            alt="S.Lecture"
          />
          <div className="absolute-fill flex-center">
            <div
              className="rounded-full flex-center w-12 h-12"
              style={{ background: 'rgba(0, 0, 0, .3)' }}
            >
              <PlayFill className="text-blue-primary ml-1" size={36} />
            </div>
          </div>
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
