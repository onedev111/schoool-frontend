import React from 'react'
import ForgotPassword from 'User/Auth/ForgotPassword'
import routes from 'routes'

export default function PasswordForgotPage() {
  return (
    <div className="flex-center">
      <div style={{ width: '250px' }} className="relative">
        <ForgotPassword
          backLink={routes.settings.password()}
          backClass="-ml-6"
        />
      </div>
    </div>
  )
}
