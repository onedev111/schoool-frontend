import React from 'react'
import logo from 'assets/images/logo.svg'
import { Eye } from '@styled-icons/ionicons-outline/Eye'
import { EyeOff } from '@styled-icons/ionicons-outline/EyeOff'
import useToggle from 'Shared/useToggle'
import { Link } from 'react-router-dom'
import Input from 'User/Auth/Shared/Input'
import routes from 'routes'

export default function SignIn() {
  const [showPassword, toggleShowPassword] = useToggle()

  return (
    <div className="flex-center h-full">
      <div style={{ width: '350px' }}>
        <div className="bg-white py-10 px-12 shadow mb-5">
          <div className="flex-center mb-5">
            <img src={logo} alt="logo" style={{ width: '80px' }} />
          </div>
          <div className="mb-2">
            <Input placeholder="Full Name" />
          </div>
          <div className="mb-2">
            <Input placeholder="Email" type="email" />
          </div>
          <div className="relative mb-5">
            <Input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
            />
            <div
              className="absolute top-0 right-0 mt-1 mr-3 text-gray-8b cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
            </div>
          </div>
          <Link
            to={routes.signUpForm()}
            className="bg-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer mb-3"
          >
            Sign Up
          </Link>
          <div className="relative text-center mb-5">
            <div className="border-t border-gray-d6 absolute left-0 right-0 top-0 mt-3" />
            <span
              className="px-2 bg-white text-gray-6e relative"
              style={{ top: '-2px' }}
            >
              or
            </span>
          </div>
          <div className="bg-blue-facebook rounded h-8 text-center text-white text-sm font-bold flex-center cursor-pointer mb-5">
            Sign up with Facebook
          </div>
          <div className="border border-black rounded h-8 text-center text-black text-sm font-bold flex-center cursor-pointer">
            Sign up with Apple
          </div>
        </div>
        <div className="bg-white py-5 px-12 shadow flex-center font-bold">
          <div className="mr-1">Have an account?</div>
          <Link to={routes.signIn()} className="text-primary">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
