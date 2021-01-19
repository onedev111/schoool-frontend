import { setItem, useLocalStorage } from 'utils/localStorage'
import { User } from './types'

const storageKey = 'currentUser'

const validateUser = (user: User) => {
  if (
    'isNew' in user &&
    'isInstructor' in user &&
    'id' in user &&
    'token' in user &&
    'name' in user &&
    'email' in user &&
    'avatar' in user
  )
    return user

  return null
}

let currentUser: User | undefined

export const useCurrentUser = () => {
  const [json, setJson] = useLocalStorage(storageKey)

  if (!currentUser)
    currentUser = ((json
      ? validateUser(JSON.parse(json) as User)
      : null) as unknown) as User

  return [
    currentUser,
    (user: User | null) => {
      setJson(user ? JSON.stringify(user) : null)
    },
  ] as const
}

export const setCurrentUser = (user: User | null) => {
  currentUser = user as User
  setItem(storageKey, user ? JSON.stringify(user) : null)
}

export const getCurrentUser = () => {
  if (!currentUser) {
    const json = localStorage.getItem(storageKey)
    currentUser = JSON.parse(json as string) as User
  }
  return currentUser
}

export const getUserToken = () => getCurrentUser()?.token

export const getCurrentUserId = () => getCurrentUser().id
