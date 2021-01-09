import { queryCache } from 'react-query'

export const setQueryData = <T>(key: string, updater: (data: T) => T) =>
  queryCache.setQueryData(
    key,
    (data: T | undefined) => (data === undefined ? data : updater(data)) as T,
  )
