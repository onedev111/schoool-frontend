import React from 'react'
import logo from 'assets/images/logo.svg'
import { Eye } from '@styled-icons/ionicons-outline/Eye'
import { EyeOff } from '@styled-icons/ionicons-outline/EyeOff'
import useToggle from 'Shared/useToggle'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { FacebookSquare } from '@styled-icons/boxicons-logos/FacebookSquare'
import { Apple } from '@styled-icons/boxicons-logos/Apple'
import Input from 'User/Auth/Shared/Input'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import api from 'api'
import Loader from 'Shared/Loader'
import { useCurrentUser } from 'User/currentUser'
import { useMutation } from 'react-query'
import history from 'utils/history'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().min(7).required(),
})

export default function SignIn() {
  const form = useForm({ schema })
  const [showPassword, toggleShowPassword] = useToggle()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useCurrentUser()
  const [error, setError] = React.useState<string | null>(null)

  const [register, { isLoading }] = useMutation(api.user.register, {
    onSettled(user, error) {
      if (user) {
        setToken(user)
        history.push(routes.signUpForm())
      }
      if (error) setError((error as Error).message)
    },
  })

  const submit = (values: {
    name: string
    email: string
    password: string
  }) => {
    if (!isLoading) register(values)
  }

  return (
    <form className="flex-center h-full" onSubmit={form.handleSubmit(submit)}>
      <div style={{ width: '350px' }}>
        <div className="bg-white py-10 px-12 shadow mb-5">
          <div className="flex-center mb-5">
            <img src={logo} alt="logo" style={{ width: '80px' }} />
          </div>
          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}
          <div className="mb-2">
            <Input form={form} name="name" placeholder="Full Name" />
          </div>
          <div className="mb-2">
            <Input form={form} name="email" placeholder="Email" type="email" />
          </div>
          <div className="relative mb-5">
            <Input
              form={form}
              name="password"
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
          <button className="bg-blue-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer mb-3">
            {!isLoading && 'Sign Up'}
            {isLoading && <Loader className="w-8 h-8" />}
          </button>
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
            Sign up with Facebook
          </div>
          <div className="border border-black rounded h-8 text-center text-black text-sm font-bold flex-center cursor-pointer">
            <Apple size={12} className="mr-2" />
            Sign up with Apple
          </div>
        </div>
        <div className="bg-white py-5 px-12 shadow flex-center font-bold">
          <div className="mr-1">Have an account?</div>
          <Link to={routes.signIn()} className="text-blue-primary">
            Log in
          </Link>
        </div>
      </div>
    </form>
  )
}
