import React from 'react'
import dragOverState from 'utils/dragOverState'

type Props = {
  children: React.ReactNode
}

// eslint-disable-next-line
const hasType = (dataTransfer: any, type: string) =>
  Array.from(dataTransfer.items || []).some(
    // eslint-disable-next-line
    (item: any) => item.kind === 'file' && item.type.startsWith(type),
  ) ||
  // eslint-disable-next-line
  Array.from(dataTransfer.files || []).some((item: any) =>
    item.type.startsWith(type),
  )

export default function DragNDropWrapper({ children }: Props) {
  const [state] = React.useState({ dragElementCount: 0 })

  // eslint-disable-next-line
  const dragEnter = ({ dataTransfer }: any) => {
    state.dragElementCount++
    if (state.dragElementCount !== 1) return
    dragOverState.hasImage = hasType(dataTransfer, 'image')
    dragOverState.hasVideo = hasType(dataTransfer, 'video')
  }

  const dragLeave = () => {
    state.dragElementCount--
    if (state.dragElementCount === 0)
      dragOverState.hasImage = dragOverState.hasVideo = false
  }

  // eslint-disable-next-line
  const drop = (e: any) => {
    e.preventDefault()
    state.dragElementCount = 0
    dragOverState.hasImage = dragOverState.hasVideo = false
  }

  const preventDefault = (e: React.DragEvent<HTMLElement>) => e.preventDefault()

  return (
    <div
      className="h-full"
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={preventDefault}
      onDrop={drop}
    >
      {children}
    </div>
  )
}
