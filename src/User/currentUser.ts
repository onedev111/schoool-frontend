import { useLocalStorage } from 'Shared/localStorage'

const tokenName = 'userToken'

export const useUserToken = (): ReturnType<typeof useLocalStorage> =>
  useLocalStorage(tokenName)

export const getUserToken = () => localStorage.getItem(tokenName)
