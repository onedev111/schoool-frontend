import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { PlayFill } from '@styled-icons/bootstrap/PlayFill'
import { PauseFill } from '@styled-icons/bootstrap/PauseFill'
import cn from 'classnames'
import useToggle from 'Shared/useToggle'

type Props = {
  onClose(): void
}

export default function AudioModal({ onClose }: Props) {
  const [recording, toggleRecording] = useToggle(true)
  const [recorded, toggleRecorded] = useToggle(true)
  const [playing, togglePlaying] = useToggle()

  return (
    <div className="pb-12">
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        Record Voice Over
      </div>
      <div
        className={cn('overflow-hidden', recording && 'bg-gray-e2')}
        style={{ height: '3px' }}
      >
        <div
          className="w-full h-full bg-blue-0c"
          style={{ transform: 'translateX(-70%)' }}
        />
      </div>
      <div className="flex-col flex-center mb-7">
        <button
          type="button"
          onClick={toggleRecording}
          className={cn(
            'text-15 border border-blue-0c rounded-full',
            recording ? 'bg-blue-0c text-white' : 'text-blue-0c',
          )}
          style={{
            marginTop: '57px',
            width: '100px',
            height: '100px',
            borderWidth: '4px',
          }}
        >
          {recording ? 'Recording' : 'Start'}
        </button>
        <div className="text-gray-6b mt-2 h-6">{recording && '00:42'}</div>
      </div>
      {!recorded && (
        <div className="text-center text-lg">
          Record your lecture. It is limted to 5 minutes.
        </div>
      )}
      {recorded && (
        <div className="flex-center">
          <button
            type="button"
            className="h-8 rounded-full border-2 border-blue-primary text-blue-primary flex-center font-bold"
            style={{ width: '130px' }}
          >
            Reset
          </button>
          {!playing && (
            <button type="button" className="ml-7" onClick={togglePlaying}>
              <PlayFill size={42} />
            </button>
          )}
          {playing && (
            <button type="button" className="ml-7" onClick={togglePlaying}>
              <PauseFill size={42} />
            </button>
          )}
          <button
            type="button"
            className="h-8 rounded-full bg-blue-primary text-white flex-center font-bold ml-7"
            style={{ width: '130px' }}
          >
            Add To Post
          </button>
        </div>
      )}
    </div>
  )
}
