import React from 'react'
import { useQuery } from 'react-query'
import api from 'api'

export default function Notifications() {
  // useQuery('notifications', api.notifications.list)

  return <div className="text-xl ml-4">Notifications</div>
}
