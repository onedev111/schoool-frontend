import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'routes'
import { setCurrentUser } from 'User/currentUser'
import useToggle from 'utils/useToggle'
import Modal from 'Shared/Modal'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  const [openSignOut, toggleSignOut] = useToggle()

  return (
    <>
      {openSignOut && (
        <Modal onClose={toggleSignOut} className="text-center">
          <div className="mt-8 text-xl font-bold">Sign Out</div>
          <div className="text-17 mt-2 mb-6">Are you sure to sign out?</div>
          <hr className="text-gray-bb" />
          <div className="flex-center my-5">
            <button
              className="text-gray-4f h-7 font-bold w-24"
              onClick={toggleSignOut}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-red-58 text-white h-7 font-bold ml-3 flex-center w-24"
              onClick={() => setCurrentUser(null)}
            >
              Sign Out
            </button>
          </div>
        </Modal>
      )}
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
          <button className="block mt-4" onClick={toggleSignOut}>
            Sign Out
          </button>
        </div>
        <div className="flex-grow py-8 px-10">{children}</div>
      </div>
    </>
  )
}
