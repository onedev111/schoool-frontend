import { QueryClient } from 'react-query'

export const queryClient = new QueryClient()

const getKeysByKeyStart = (key: unknown[]) =>
  queryClient
    .getQueryCache()
    .findAll(key)
    .map((cache) => cache.queryKey)

export const updatePages = <T>(key: unknown[], update: (pages: T) => T) =>
  getKeysByKeyStart(key).forEach((key) =>
    queryClient.setQueryData<{ pages: T } | undefined>(key, (data) => {
      if (!data) return data

      return {
        ...data,
        pages: update(data.pages),
      }
    }),
  )

export const updateData = <T>(key: unknown[], update: (data: T) => T) =>
  getKeysByKeyStart(key).forEach((key) =>
    queryClient.setQueryData<T | undefined>(key, (data) => {
      if (!data) return data

      return update(data)
    }),
  )
