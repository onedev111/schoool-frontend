import React from 'react'
import { setCurrentUser } from 'User/currentUser'

export default function Settings() {
  return (
    <div className="mt-4">
      <button className="inline" onClick={() => setCurrentUser(null)}>
        Log Out
      </button>
    </div>
  )
}
