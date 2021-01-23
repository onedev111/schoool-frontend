import React from 'react'
import SignUpForm from 'User/Auth/SignUpForm'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'

export default function ProfilePage() {
  const [openSuccess, toggleSuccess] = useToggle()

  return (
    <>
      {openSuccess && (
        <Alert title="Profile successfully updated" onClose={toggleSuccess} />
      )}
      <SignUpForm submitText="Update" onSuccess={toggleSuccess} />
    </>
  )
}
