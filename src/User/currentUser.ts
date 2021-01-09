import { setItem, useLocalStorage } from 'utils/localStorage'
import { User } from './types'

const storageKey = 'currentUser'

export const useCurrentUser = () => {
  const [json, setJson] = useLocalStorage(storageKey)
  return [
    ((json ? (JSON.parse(json) as User) : null) as unknown) as User,
    (user: User | null) => {
      setJson(user ? JSON.stringify(user) : null)
    },
  ] as const
}

export const setCurrentUser = (user: User | null) => {
  setItem(storageKey, user ? JSON.stringify(user) : null)
}

export const getCurrentUser = () => {
  const json = localStorage.getItem(storageKey)
  return JSON.parse(json as string) as User
}

export const getUserToken = () => getCurrentUser()?.token

export const getCurrentUserId = () => getCurrentUser().id
