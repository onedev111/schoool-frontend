import React from 'react'
import { InfoLarge } from '@styled-icons/typicons/InfoLarge'
import style from 'Home/style.module.css'
import { Equalizer } from '@styled-icons/remix-fill/Equalizer'
import Volume from 'assets/images/icons/volume'
import Notebook from 'assets/images/icons/notebook'

export default function Phrase() {
  return (
    <div
      className="bg-white shadow relative py-6 px-5 mb-5"
      style={{ minHeight: '209px' }}
    >
      <div className="flex items-center justify-between text-blue-primary text-xl mb-4">
        <div className="uppercase">Useful expressions</div>
        <InfoLarge size={22} />
      </div>
      <div className={`text-gray-4f text-2xl ${style.largeText}`}>
        My headache isn’t serious and it will wear off after an hour or so.
      </div>
      <div className="absolute right-0 bottom-0 mr-5 mb-5 h-8 flex items-center">
        <div className="h-8 w-8 flex-center cursor-pointer">
          <Equalizer className="transform rotate-90" size={16} />
        </div>
        <div className="h-8 w-8 flex-center cursor-pointer ml-2">
          <Volume />
        </div>
        <div className="h-8 w-8 flex-center cursor-pointer ml-2">
          <Notebook className="h-4" />
        </div>
      </div>
    </div>
  )
}
