import React from 'react'
import { InfoLarge } from '@styled-icons/typicons/InfoLarge'
import style from 'Home/style.module.css'
import useToggle from 'utils/useToggle'
import ChangeLevelModal from 'Post/UsefulExpression/ChangeLevelModal'

export default function Phrase() {
  const [selectLevel, toggleSelectLevel] = useToggle()

  return (
    <>
      {selectLevel && <ChangeLevelModal onClose={toggleSelectLevel} />}
      <div
        className="bg-white shadow relative py-6 px-5 mb-5"
        style={{ minHeight: '209px' }}
      >
        <div className="flex items-center justify-between text-blue-primary text-xl mb-4">
          <div className="uppercase">Useful expressions</div>
          <InfoLarge size={22} />
        </div>
        <div
          className={`text-gray-4f text-2xl text-center mb-6 px-3 ${style.largeText}`}
        >
          You’ve completed this level. Choose what to do next.
        </div>
        <div className="flex-center">
          <button
            className="rounded-full bg-blue-primary text-white h-8 px-7 font-bold"
            onClick={toggleSelectLevel}
          >
            Change Level
          </button>
        </div>
      </div>
    </>
  )
}
