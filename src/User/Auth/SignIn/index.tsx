import React from 'react'
import logo from 'assets/images/logo.svg'
import { Eye } from '@styled-icons/ionicons-outline/Eye'
import { EyeOff } from '@styled-icons/ionicons-outline/EyeOff'
import useToggle from 'utils/useToggle'
import { Link } from 'react-router-dom'
import Input from 'User/Auth/Shared/Input'
import { Apple } from '@styled-icons/boxicons-logos/Apple'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import routes from 'routes'
import api from 'api'
import Loader from 'Shared/Loader'
import { useMutation } from 'react-query'
import { useCurrentUser } from 'User/currentUser'
import history from 'utils/history'
import FacebookSignIn from 'User/Auth/FacebookSignIn'

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
})

export default function SignIn() {
  const form = useForm({ schema })
  const [showPassword, toggleShowPassword] = useToggle()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useCurrentUser()
  const [authType, setAuthType] = React.useState<
    'email' | 'facebook' | 'apple'
  >('email')
  const [error, setError] = React.useState<string | null>(null)

  const { mutate: signIn, isLoading } = useMutation(api.user.login, {
    onSettled(user, error) {
      if (user) {
        setUser(user)
        if (user.isNew) history.push(routes.signUpForm())
      }
      if (error) setError((error as Error).message)
    },
  })

  const submit = (values: { email: string; password: string }) => {
    if (!isLoading) {
      setAuthType('email')
      signIn({ emailBased: values })
    }
  }

  return (
    <form className="flex-center h-full" onSubmit={form.handleSubmit(submit)}>
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
          {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
          )}
          <div className="mb-2">
            <Input form={form} name="email" type="email" placeholder="Email" />
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
            {(!isLoading || authType !== 'email') && 'Log In'}
            {isLoading && authType === 'email' && (
              <Loader className="w-8 h-8" />
            )}
          </button>
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
          <FacebookSignIn
            text="Log in with Facebook"
            signIn={signIn}
            onClick={() => setAuthType('facebook')}
            isLoading={isLoading && authType === 'facebook'}
          />
          {/*<div className="border border-black rounded h-8 text-center text-black text-sm font-bold flex-center cursor-pointer">*/}
          {/*  <Apple size={12} className="mr-2" />*/}
          {/*  Log in with Apple*/}
          {/*</div>*/}
        </div>
        <div className="bg-white py-5 px-12 shadow flex-center font-bold">
          <div className="mr-1">Create an account.</div>
          <Link to={routes.signUp()} className="text-blue-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}
