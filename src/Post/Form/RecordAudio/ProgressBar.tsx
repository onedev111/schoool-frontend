import { State as AudioState } from 'Post/Form/RecordAudio/State'
import { observer } from 'mobx-react-lite'
import React from 'react'

// const getTranslateX = (state: AudioState) =>

type Props = {
  state: AudioState
}

export default observer(function ProgressBar({ state }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)

  // React.useEffect(() => {
  //   if (state.isRecording) {
  //     let request = 0
  //
  //     const animation = () => {
  //       if (ref.current) {
  //         ref.current.style.transform = getTranslateX(state)
  //       }
  //       request = requestAnimationFrame(animation)
  //     }
  //
  //     animation()
  //
  //     return () => {
  //       cancelAnimationFrame(request)
  //     }
  //   } else {
  //     if (ref.current) ref.current.style.transform = getTranslateX(state)
  //   }
  // }, [state.isRecording])

  // React.useEffect(() => {
  //   if (!state.blob && ref.current)
  //     ref.current.style.transform = getTranslateX(state)
  // }, [state.blob])

  const transform = `translateX(${
    Math.round((state.currentTime * 100) / state.maxTime) - 100
  }%)`

  return (
    <div className="overflow-hidden bg-gray-e2" style={{ height: '3px' }}>
      <div
        ref={ref}
        className="w-full h-full bg-blue-0c"
        style={{ transform }}
      />
    </div>
  )
})
