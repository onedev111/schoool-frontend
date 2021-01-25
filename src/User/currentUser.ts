import { setItem, useLocalStorage } from 'utils/localStorage'
import { CurrentUser } from './types'

const storageKey = 'currentUser'

const validateUser = (user: CurrentUser) => {
  if (
    'isNew' in user &&
    'isInstructor' in user &&
    'id' in user &&
    'token' in user &&
    'name' in user &&
    'email' in user &&
    'avatar' in user &&
    'language' in user &&
    'location' in user
  )
    return user

  return null
}

let currentUser: CurrentUser | undefined

export const setCurrentUser = (user: CurrentUser | null) => {
  currentUser = user as CurrentUser
  setItem(storageKey, user ? JSON.stringify(user) : null)
}

export const useCurrentUser = () => {
  const [json] = useLocalStorage(storageKey)

  if (!currentUser)
    currentUser = ((json
      ? validateUser(JSON.parse(json) as CurrentUser)
      : null) as unknown) as CurrentUser

  return [currentUser, setCurrentUser] as const
}

export const getCurrentUser = () => {
  if (!currentUser) {
    const json = localStorage.getItem(storageKey)
    currentUser = JSON.parse(json as string) as CurrentUser
  }
  return currentUser
}

export const getUserToken = () => getCurrentUser()?.token

export const getCurrentUserId = () => getCurrentUser().id

export const updateCurrentUser = (params: Partial<CurrentUser>) =>
  setCurrentUser({ ...getCurrentUser(), ...params })
