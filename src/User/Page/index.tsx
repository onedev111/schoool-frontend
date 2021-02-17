import React from 'react'
import Sidebar from 'User/Page/Sidebar'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import api from 'api'
import UserContent from 'User/Page/Content'
import { getCurrentUserId } from 'User/currentUser'
import style from './style.module.css'

export default function UserPage() {
  const {
    params: { id: stringId },
  } = useRouteMatch<{ id?: string }>()
  const currentUserId = getCurrentUserId()
  const id = stringId && stringId !== 'me' ? parseInt(stringId) : currentUserId
  const isMe = id === currentUserId

  const { data: user, isLoading } = useQuery(['user', id], () =>
    api.user.getUser({ id }),
  )

  return (
    <div className="flex h-full">
      <Sidebar
        className={style.hideOnSmallScreen}
        isMe={isMe}
        userId={id}
        user={user}
        isLoading={isLoading}
      />
      <div
        className="pt-8 w-full flex-shrink-0 mx-auto"
        style={{ maxWidth: '640px' }}
      >
        <UserContent isMe={isMe} userId={id} />
      </div>
    </div>
  )
}
