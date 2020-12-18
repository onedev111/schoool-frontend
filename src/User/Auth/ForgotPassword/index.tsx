import React from 'react'
import logo from 'assets/images/logo.svg'
import Input from 'User/Auth/Shared/Input'
import { LeftArrowAlt } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import routes from 'routes'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className="h-full flex-center">
      <div
        className="bg-white py-10 px-12 relative shadow"
        style={{ width: '350px' }}
      >
        <Link
          to={routes.signIn()}
          className="absolute top-0 left-0 mt-2 ml-3 text-gray-5f"
        >
          <LeftArrowAlt size={36} />
        </Link>
        <div className="flex-center mb-5">
          <img src={logo} alt="logo" style={{ width: '80px' }} />
        </div>
        <div className="text-center text-xl text-black mb-3">
          Forgot Password
        </div>
        <div className="text-center text-sm mb-5">
          Enter the email address you used to sign in to SCHOOOL and we’ll send
          you the reset password.
        </div>
        <Input placeholder="Email" className="mb-5" />
        <input
          className="bg-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer"
          type="submit"
          value="Send Password"
        />
      </div>
    </div>
  )
}
