import React from 'react'
import { useUserToken } from 'User/currentUser'

export default function Settings() {
  const [_, setToken] = useUserToken()

  return (
    <div className="mt-4">
      <button className="inline" onClick={() => setToken(null)}>
        Log Out
      </button>
    </div>
  )
}
