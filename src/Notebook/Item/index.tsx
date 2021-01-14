import React from 'react'
import { NotebookSentence } from 'Notebook/types'
import CircleCheckbox from 'Shared/CircleCheckbox'
import useToggle from 'utils/useToggle'

type Props = {
  sentence: NotebookSentence
  selecting: boolean
  checkedIds: Record<number, boolean>
  toggleItem(id: number): void
}

export default function SentenceItem({
  sentence,
  selecting,
  checkedIds,
  toggleItem,
}: Props) {
  const textRef = React.useRef<HTMLDivElement>(null)
  const translationRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number>()
  const [showTranslation, toggleTranslation] = useToggle()

  React.useEffect(() => {
    const text = textRef.current
    const translation = translationRef.current
    if (text && translation) {
      setHeight(Math.max(text.offsetHeight, translation.offsetHeight))
    }
  }, [])

  return (
    <div
      className="text-17 py-3 px-4 border-b border-gray-c5 flex items-center"
      onClick={() => selecting && toggleItem(sentence.id)}
    >
      <div
        className="flex-grow relative"
        style={{
          height: !selecting ? height : undefined,
          perspective: '250px',
        }}
        onClick={() => !selecting && toggleTranslation()}
      >
        <div
          ref={textRef}
          className="transition-all ease-in-out duration-500"
          style={{
            minHeight: !selecting ? height : undefined,
            transform:
              !selecting && showTranslation ? 'rotateX(180deg)' : undefined,
            opacity: !selecting && showTranslation ? 0 : undefined,
          }}
        >
          {sentence.text}
        </div>
        {!selecting && (
          <div
            className="absolute top-0 left-0 right-0 transition-all duration-500 opacity-0"
            ref={translationRef}
            style={{
              minHeight: height,
              transform: !showTranslation ? 'rotateX(-180deg)' : undefined,
              opacity: showTranslation ? 1 : undefined,
            }}
          >
            {sentence.translation}
          </div>
        )}
        {selecting && (
          <div className="text-gray-6b mt-2">{sentence.translation}</div>
        )}
      </div>
      {selecting && (
        <CircleCheckbox
          className="flex-shrink-0 ml-2"
          checked={checkedIds[sentence.id]}
        />
      )}
    </div>
  )
}
