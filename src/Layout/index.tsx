import React from 'react'
import logo from 'assets/images/logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { Search } from '@styled-icons/fa-solid/Search'
import routes from 'routes'
import useToggle from 'Shared/useToggle'
import cn from 'classnames'
import avatar from 'assets/images/avatar.svg'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [searchValue, setSearchValue] = React.useState('')
  const [searchFocused, toggleSearchFocus] = useToggle()

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="bg-white shadow flex flex-shrink-0 items-center relative"
        style={{ height: '80px' }}
      >
        <div className="absolute top-0 left-0 bottom-0 ml-8 flex-center">
          <Link to={routes.home()}>
            <img style={{ width: '50px' }} src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className="w-full mx-auto font-bold"
          style={{ maxWidth: '1080px' }}
        >
          <div
            className="w-full flex justify-between"
            style={{ maxWidth: '640px' }}
          >
            <div className="flex">
              <NavLink
                to={routes.home()}
                className="text-xl"
                exact
                activeClassName="text-blue-primary"
              >
                Home
              </NavLink>
              <NavLink
                to={routes.class()}
                exact
                className="text-xl ml-4"
                activeClassName="text-blue-primary"
              >
                Class
              </NavLink>
              <NavLink
                to={routes.notifications()}
                exact
                className="text-xl ml-4"
                activeClassName="text-blue-primary"
              >
                Notifications
              </NavLink>
              <NavLink
                to={routes.settings()}
                exact
                className="text-xl ml-4 flex-center"
                activeClassName="text-blue-primary"
              >
                Settings
              </NavLink>
            </div>
            <div className="flex">
              <div
                style={{ width: '205px' }}
                className={cn(
                  'h-8 rounded-full border bg-gray-fc relative overflow-hidden',
                  searchFocused ? 'border-gray-45' : 'border-gray-97',
                )}
              >
                <div
                  className="text-gray-a4 h-full flex-center uppercase text-sm font-bold absolute-fill"
                  hidden={Boolean(searchFocused || searchValue)}
                >
                  <Search size={14} className="mr-1" />
                  Schoool
                </div>
                <input
                  onFocus={toggleSearchFocus}
                  onBlur={toggleSearchFocus}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={cn(
                    'absolute-fill focus:outline-none bg-gray-fc opacity-0 px-6 rounded-full',
                    (searchFocused || searchValue) && 'opacity-100',
                  )}
                />
              </div>
              <img
                style={{ width: '30px', height: '30px' }}
                className="ml-4"
                src={avatar}
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1080px' }} className="w-full mx-auto">
        {children}
      </div>
    </div>
  )
}
