import React from 'react'
import logo from 'assets/images/logo.svg'
import Input from 'User/Auth/Shared/Input'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import api from 'api'
import { useMutation } from 'react-query'
import Alert from 'Shared/Modal/Alert'
import Loader from 'Shared/Loader'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'

const schema = yup.object({
  email: yup.string().required(),
})

type Props = {
  backLink: string
  backClass?: string
}

export default function ForgotPassword({ backLink, backClass }: Props) {
  const form = useForm({ schema })
  const [modalMessage, setModalMessage] = React.useState<string | null>(null)

  const { mutate: forgotPassword, isLoading } = useMutation(
    api.user.forgotPassword,
    {
      onSettled(data, error) {
        setModalMessage(
          data ? 'Password sent to email' : (error as Error).message,
        )
      },
    },
  )

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
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="absolute top-0 left-0 flex-center text-gray-5f">
          <Link to={backLink} className={backClass}>
            <ArrowLeft size={26} />
          </Link>
        </div>
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
        <Input
          form={form}
          name="email"
          type="email"
          placeholder="Email"
          className="mb-5"
        />
        <button className="bg-blue-primary rounded h-10 flex-center text-white font-bold w-full cursor-pointer">
          {!isLoading && 'Send Password'}
          {isLoading && <Loader className="w-5 h-5" />}
        </button>
      </form>
    </>
  )
}
