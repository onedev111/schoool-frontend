import React from 'react'
import logo from 'assets/images/logo.svg'
import Input from 'User/Auth/Shared/Input'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import routes from 'routes'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import api from 'api'
import { useMutation } from 'react-query'
import Alert from 'Shared/Modal/Alert'
import Loader from 'Shared/Loader'

const schema = yup.object({
  email: yup.string().required(),
})

export default function ForgotPassword() {
  const form = useForm({ schema })
  const [modalMessage, setModalMessage] = React.useState<string | null>(null)

  const [forgotPassword, { isLoading }] = useMutation(api.user.forgotPassword, {
    onSettled(data, error) {
      setModalMessage(
        data ? 'Password sent to email' : (error as Error).message,
      )
    },
  })

  const submit = (values: { email: string }) => {
    if (isLoading) return

    forgotPassword(values)
  }

  return (
    <>
      {modalMessage && (
        <Alert
          title={modalMessage}
          size="small"
          onClose={() => setModalMessage(null)}
        />
      )}
      <form className="h-full flex-center" onSubmit={form.handleSubmit(submit)}>
        <div
          className="bg-white py-10 px-12 relative shadow"
          style={{ width: '350px' }}
        >
          <Link
            to={routes.signIn()}
            className="absolute top-0 left-0 mt-2 ml-3 text-gray-5f"
          >
            <ArrowBack size={24} />
          </Link>
          <div className="flex-center mb-5">
            <img src={logo} alt="logo" style={{ width: '80px' }} />
          </div>
          <div className="text-center text-xl text-black mb-3">
            Forgot Password
          </div>
          <div className="text-center text-sm mb-5">
            Enter the email address you used to sign in to SCHOOOL and we’ll
            send you the reset password.
          </div>
          <Input
            form={form}
            name="email"
            type="email"
            placeholder="Email"
            className="mb-5"
          />
          <button className="bg-blue-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer">
            {!isLoading && 'Send Password'}
            {isLoading && <Loader />}
          </button>
        </div>
      </form>
    </>
  )
}
