import React from 'react'
import { useCurrentUser } from 'User/currentUser'

export default function Settings() {
  const [_, setUser] = useCurrentUser()

  return (
    <div className="mt-4">
      <button className="inline" onClick={() => setUser(null)}>
        Log Out
      </button>
    </div>
  )
}
