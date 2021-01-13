import React from 'react'
import { State } from 'Post/Form/State'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import cn from 'classnames'

type Props = {
  state: State
}

export default function Zoom({ state }: Props) {
  const [link, setLink] = React.useState(state.values.zoomLink || '')
  let isValid = false

  try {
    if (new URL(link).host === 'zoom.us') isValid = true
  } catch (err) {
    // noop
  }

  const onClose = () => state.backToForm()

  return (
    <form
      className="pb-12"
      onSubmit={() => {
        state.setZoomLink(link)
        onClose()
      }}
    >
      <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
        <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={26} />
          </button>
        </div>
        ADD ZOOM MEETING LINK
      </div>
      <div className="pt-4 px-6">
        <div className="text-17">
          If you want to take your students to the zoom meeting you host, copy
          and paste the zoom meeting link here.
        </div>
        <input
          className="h-12 text-gray-45 px-4 border border-gray-97 rounded w-full mt-3"
          placeholder="Enter or paste your Zoom meeting link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="flex-center mt-10">
          <button
            className={cn(
              'h-8 rounded-full bg-blue-primary text-white',
              !isValid && 'opacity-25',
            )}
            style={{ width: '200px' }}
            disabled={!isValid}
          >
            Add Link
          </button>
        </div>
      </div>
    </form>
  )
}
