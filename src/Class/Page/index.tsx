import React from 'react'
import { useParams } from 'react-router-dom'
import ClassLayout from 'Class/Layout'
import logo from 'assets/images/logo.svg'
import picture from 'assets/images/picture.png'
import Posts from 'Class/Posts'

export default function ClassPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <ClassLayout>
      <div className="bg-white shadow mb-5 pt-16 px-16 pb-10">
        <div className="flex-center mb-4">
          <img src={logo} alt="logo" width={70} height={70} />
          <img
            className="mx-10 rounded-full"
            src={picture}
            alt="class photo"
            width={240}
            height={240}
          />
          <div
            style={{ width: '100px' }}
            className="border border-black rounded-full flex-center h-6 text-sm text-black"
          >
            Private
          </div>
        </div>
        <div
          className="text-3xl font-bold text-black flex-center"
          style={{ height: '38px' }}
        >
          Name of the class
        </div>
        <div className="text-blue-primary text-lg flex-center h-6 mb-4">
          Created by Mark Kim
        </div>
        <div className="text-black text-lg mb-4">
          The description of the class is written here.The description of the
          class is written here.The description of the class is written here.The
          description of the class is written here.
        </div>
        <div className="flex">
          <button
            type="button"
            className="w-1/2 bg-blue-primary rounded-full h-10 flex-center text-white text-lg"
          >
            Classmates
          </button>
          <button
            type="button"
            className="w-1/2 bg-white border border-blue-primary text-blue-primary text-lg font-bold flex-center ml-5 rounded-full"
          >
            Join
          </button>
        </div>
      </div>
      <Posts />
    </ClassLayout>
  )
}
