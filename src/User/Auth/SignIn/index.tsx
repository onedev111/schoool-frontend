import React from 'react'
import logo from 'assets/images/logo.svg'
import { Eye } from '@styled-icons/ionicons-outline/Eye'
import { EyeOff } from '@styled-icons/ionicons-outline/EyeOff'
import useToggle from 'Shared/useToggle'
import { Link } from 'react-router-dom'
import Input from 'User/Auth/Shared/Input'
import { FacebookSquare } from '@styled-icons/boxicons-logos/FacebookSquare'
import { Apple } from '@styled-icons/boxicons-logos/Apple'
import routes from 'routes'

export default function SignIn() {
  const [showPassword, toggleShowPassword] = useToggle()

  return (
    <div className="flex-center h-full">
      <div
        className="flex flex-col items-center text-center mr-24"
        style={{ maxWidth: '300px' }}
      >
        <div className="mb-12">
          <img src={logo} alt="logo" />
        </div>
        <div style={{ maxWidth: '280px' }}>
          <div className="mb-3 text-2xl">
            Teach and Learn English at{' '}
            <span className="text-blue-primary">SCHOOOL</span>
          </div>
          <div className="font-sm">
            We provide an ideal platform for both ESL teachers and students
            globally
          </div>
        </div>
      </div>
      <div className="ml-6" style={{ width: '350px' }}>
        <div className="bg-white py-10 px-12 shadow mb-5">
          <div className="mb-2">
            <Input type="email" placeholder="Email" />
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
          <input
            className="bg-blue-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer mb-3"
            type="submit"
            value="Log In"
          />
          <div className="text-center mb-3">
            <Link
              to={routes.forgotPassword()}
              className="text-blue-primary text-sm"
            >
              Forgot password?
            </Link>
          </div>
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
            <div className="mr-2 rounded overflow-hidden">
              <FacebookSquare size={19} />
            </div>
            Log in with Facebook
          </div>
          <div className="border border-black rounded h-8 text-center text-black text-sm font-bold flex-center cursor-pointer">
            <Apple size={12} className="mr-2" />
            Log in with Apple
          </div>
        </div>
        <div className="bg-white py-5 px-12 shadow flex-center font-bold">
          <div className="mr-1">Create an account.</div>
          <Link to={routes.signUp()} className="text-blue-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
