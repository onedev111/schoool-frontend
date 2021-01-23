import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'routes'
import { setCurrentUser } from 'User/currentUser'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div
      className="bg-white w-full mx-auto mt-8 flex shadow"
      style={{ maxWidth: '960px' }}
    >
      <div
        style={{ width: '320px' }}
        className="text-lg text-black border-r border-gray-c5 py-8 px-8"
      >
        <NavLink
          to={routes.settings.profile()}
          className="block"
          activeClassName="text-blue-primary"
        >
          My Profile
        </NavLink>
        <NavLink
          to={routes.settings.password()}
          className="block mt-4"
          activeClassName="text-blue-primary"
        >
          Password
        </NavLink>
        <NavLink
          to={routes.settings.termsOfUse()}
          className="block mt-4"
          activeClassName="text-blue-primary"
        >
          Terms Of Use
        </NavLink>
        <NavLink
          to={routes.settings.privacyPolicy()}
          className="block mt-4"
          activeClassName="text-blue-primary"
        >
          Privacy Policy
        </NavLink>
        <button className="block mt-4" onClick={() => setCurrentUser(null)}>
          Log Out
        </button>
      </div>
      <div className="flex-grow py-8 px-10">{children}</div>
    </div>
  )
}
