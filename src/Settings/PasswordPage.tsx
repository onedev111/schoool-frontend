import React from 'react'
import { getCurrentUser } from 'User/currentUser'
import { useForm } from 'Shared/Form'
import * as yup from 'yup'
import Loader from 'Shared/Loader'
import ErrorMessage from 'Shared/Form/ErrorMessage'
import { useMutation } from 'react-query'
import api from 'api'
import Alert from 'Shared/Modal/Alert'
import { Link } from 'react-router-dom'
import routes from 'routes'

const schema = yup.object({
  oldPassword: yup.string().min(7).required().label('Old password'),
  newPassword: yup.string().min(7).required().label('New password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .label('Password confirmation'),
})

export default function PasswordPage() {
  const user = getCurrentUser()
  const form = useForm({
    schema,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: '',
    },
  })
  const [alert, setAlert] = React.useState<string>()

  const { mutate: changePassword, isLoading } = useMutation(
    api.user.changePassword,
    {
      onSuccess() {
        setAlert('Your password has been successfully changed.')
        form.reset()
      },
      onError(error) {
        setAlert((error as Error).message)
      },
    },
  )

  const submit = () => {
    changePassword(form.getValues())
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      {alert && <Alert title={alert} onClose={() => setAlert(undefined)} />}
      <div className="flex items-center">
        <div
          className="rounded-full bg-center bg-cover mr-4"
          style={{
            width: '100px',
            height: '100px',
            backgroundImage: `url("${user.avatar}")`,
          }}
        />
        <div className="text-black text-lg font-bold">{user.name}</div>
      </div>
      <div className="mt-8">
        <div className="text-lg ml-1 mb-1">Old Password</div>
        <input
          ref={form.register}
          type="password"
          name="oldPassword"
          className="rounded border border-gray-c5 placeholder-gray-6b px-4 w-full h-10"
        />
        <ErrorMessage form={form} name="oldPassword" />
      </div>
      <div className="mt-8">
        <div className="text-lg ml-1 mb-1">New Password</div>
        <input
          ref={form.register}
          type="password"
          name="newPassword"
          className="rounded border border-gray-c5 placeholder-gray-6b px-4 w-full h-10"
        />
        <ErrorMessage form={form} name="newPassword" />
      </div>
      <div className="mt-8">
        <div className="text-lg ml-1 mb-1">Confirm New Password</div>
        <input
          ref={form.register}
          type="password"
          name="passwordConfirmation"
          className="rounded border border-gray-c5 placeholder-gray-6b px-4 w-full h-10"
        />
        <ErrorMessage form={form} name="passwordConfirmation" />
      </div>
      <div className="flex-center mt-12">
        <button
          className="bg-blue-primary rounded-full h-10 flex-center text-white font-bold w-full cursor-pointer"
          style={{ maxWidth: '300px' }}
          disabled={isLoading}
        >
          {!isLoading && 'Update'}
          {isLoading && <Loader className="w-8 h-8" />}
        </button>
      </div>
      <div className="text-center mt-6">
        <Link
          to={routes.settings.passwordForgot()}
          className="text-blue-primary"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  )
}
