import { useLocalStorage } from 'Shared/localStorage'
import { User } from './types'

const tokenName = 'currentUser'

export const useCurrentUser = () => {
  const [json, setJson] = useLocalStorage(tokenName)
  return [
    ((json ? (JSON.parse(json) as User) : null) as unknown) as User,
    (user: User | null) => {
      setJson(user ? JSON.stringify(user) : null)
    },
  ] as const
}

export const getCurrentUser = () => {
  const json = localStorage.getItem(tokenName)
  return JSON.parse(json as string) as User
}

export const getUserToken = () => getCurrentUser()?.token

export const getCurrentUserId = () => getCurrentUser().id
