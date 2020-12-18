import React from 'react'
import logo from 'assets/images/logo.svg'
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'
import style from './style.module.css'
import beer from 'assets/images/beer.svg'
import { Heart } from '@styled-icons/boxicons-solid/Heart'
import { Comment } from '@styled-icons/fa-solid/Comment'
import { Check } from '@styled-icons/boxicons-regular/Check'
import Notebook from 'assets/images/icons/notebook'
import { Camera } from '@styled-icons/boxicons-regular/Camera'
import { Smile } from '@styled-icons/boxicons-regular/Smile'
import { InfoLarge } from '@styled-icons/typicons/InfoLarge'

export default function Home() {
  return (
    <div className="mt-8 flex">
      <div style={{ maxWidth: '640px' }} className="w-full pb-12">
        <div className="bg-white p-5 flex-center mb-5 shadow">
          <img
            src={logo}
            alt="logo"
            style={{ width: '60px', height: '60px' }}
          />
          <input
            type="text"
            className="ml-3 w-full rounded-full border border-gray-bc bg-gray-f7 focus:outline-none px-6 placeholder-gray-6b focus:border-gray-97"
            style={{ height: '56px' }}
            placeholder="What do you want to post?"
          />
        </div>

        <div className="bg-white shadow relative mb-5">
          <DotsHorizontalRounded
            size={24}
            className="absolute top-0 right-0 mt-8 mr-5"
          />

          <div className="p-5">
            <div className="flex-center mb-3">
              <img
                src={logo}
                alt="logo"
                style={{ width: '60px', height: '60px' }}
                className="mr-3"
              />
              <div className="flex-grow">
                <div className="text-xl text-gray-02">Mark Kim</div>
                <div className="font-bold text-gray-b0 text-sm">
                  Yesterday, 12:24 AM
                </div>
              </div>
            </div>

            <div className={`text-gray-02 mb-3 ${style.text}`}>
              This is where post comment is written. This is where post comment
              is written. This is where post comment is written. This is where
              post comment is written.
            </div>

            <div className={`text-primary uppercase ${style.text}`}>
              Send to notebook
            </div>

            <div className={`text-gray-87 uppercase ${style.text}`}>
              Sentences included in the note book sentences
            </div>

            <div className={`text-gray-87 uppercase ${style.text}`}>
              모국어 번역 표현이 나옴. 이탤릭이고
            </div>
          </div>

          <img src={beer} alt="beer" className="w-full" />

          <div
            style={{ height: '90px' }}
            className="border-b border-gray-d6 flex items-center justify-around px-8"
          >
            <button className="w-1/4 text-center text-gray-5f transition duration-200 hover:text-primary">
              <Heart size={34} />
            </button>
            <button className="w-1/4 flex-center text-gray-5f transition duration-200 hover:text-primary">
              <Comment size={29} />
              <div className="text-lg ml-3">12</div>
            </button>
            <button className="w-1/4 text-center text-gray-5f transition duration-200 hover:text-primary">
              <Check size={40} />
            </button>
            <button className="w-1/4 flex-center text-gray-5f transition duration-200 hover:text-primary text-red-500">
              <Notebook />
            </button>
          </div>

          <div className="pt-6 pb-3 pl-5 pr-8 flex-center">
            <div className="flex-grow">
              <textarea
                rows={1}
                className="resize-none focus:outline-none placeholder-gray-6b mb-2 w-full"
                placeholder="Write a comment"
              />
              <div>
                <Camera
                  className="text-gray-a4 cursor-pointer transition duration-200 hover:text-primary"
                  size={25}
                />
                <Smile
                  className="text-gray-a4 cursor-pointer transition duration-200 hover:text-primary ml-2"
                  size={25}
                />
              </div>
            </div>
            <div className="text-primary opacity-25 text-lg">Post</div>
          </div>
        </div>

        <div
          className="bg-white shadow relative p-5 flex-center"
          style={{ minHeight: '209px' }}
        >
          <InfoLarge
            className="absolute top-0 right-0 mt-6 mr-6 text-primary"
            size={22}
          />
          <div className={`text-gray-4f text-2xl ${style.largeText}`}>
            My headache isn’t serious and it will wear off after an hour or so.
          </div>
        </div>
      </div>
    </div>
  )
}
