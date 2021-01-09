import React from 'react'
import logo from 'assets/images/logo.svg'
import FormContent from './Content'
import useToggle from 'utils/useToggle'

export default function PostForm() {
  const [showModal, toggleModal] = useToggle(false)

  return (
    <>
      {showModal && <FormContent onClose={toggleModal} />}
      <div
        className="bg-white p-5 flex-center mb-5 shadow"
        onClick={toggleModal}
      >
        <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
        <input
          type="text"
          className="ml-3 w-full rounded-full border border-gray-bc bg-gray-f7 focus:outline-none px-6 placeholder-gray-6b focus:border-gray-97"
          style={{ height: '56px' }}
          placeholder="What do you want to post?"
        />
      </div>
    </>
  )
}
