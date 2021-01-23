import React from 'react'
import SignUpForm from 'User/Auth/SignUpForm'
import history from 'utils/history'
import routes from 'routes'

export default function SignUpFormPage() {
  return (
    <div className="h-full flex-center">
      <div
        className="shadow bg-white py-10 px-12 w-full"
        style={{ maxWidth: '640px' }}
      >
        <SignUpForm
          submitText="Submit"
          onSuccess={() => history.push(routes.home())}
        />
      </div>
    </div>
  )
}
