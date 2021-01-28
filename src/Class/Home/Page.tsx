import React from 'react'
import ClassLayout from 'Class/Layout'
import Posts from 'Post/List'
import classIcon from 'assets/images/icons/class.png'

export default function Class() {
  return (
    <ClassLayout>
      <Posts>
        <div className="bg-white shadow p-6 h-full">
          <div className="flex-center flex-col mt-32 pt-2">
            <img src={classIcon} alt="class" />
            <div className="text-gray-71 text-17 uppercase mt-6 text-center font-bold">
              CREATE OR JOIN CLASSES.
              <br />
              YOU CAN STUDY WITH ANYONE IN THE WORLD.
            </div>
          </div>
        </div>
      </Posts>
    </ClassLayout>
  )
}
