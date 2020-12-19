import React from 'react'
import logo from 'assets/images/logo.svg'

export default function PostForm() {
  return (
    <div className="bg-white p-5 flex-center mb-5 shadow">
      <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
      <input
        type="text"
        className="ml-3 w-full rounded-full border border-gray-bc bg-gray-f7 focus:outline-none px-6 placeholder-gray-6b focus:border-gray-97"
        style={{ height: '56px' }}
        placeholder="What do you want to post?"
      />
    </div>
  )
}
