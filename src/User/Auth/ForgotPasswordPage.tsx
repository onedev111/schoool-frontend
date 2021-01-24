import React from 'react'
import ForgotPassword from 'User/Auth/ForgotPassword'
import routes from 'routes'

export default function ForgotPasswordPage() {
  return (
    <div className="h-full flex-center">
      <div
        className="bg-white py-10 px-12 relative shadow"
        style={{ width: '350px' }}
      >
        <div className="relative">
          <ForgotPassword backLink={routes.signIn()} />
        </div>
      </div>
    </div>
  )
}
