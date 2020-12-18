import history from 'Shared/history'
import { getUserToken } from 'User/currentUser'
import { useMutation, useQuery, queryCache } from 'react-query'
import routes from './routes'

type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

type Options = {
  method?: HTTPMethod
  headers?: Record<string, string>
  body?: string | FormData
}

const request = async <T>(
  method: HTTPMethod,
  path: string,
  data?: unknown,
  options: Options = {},
): Promise<T> => {
  options.method = method
  if (!options.headers) options.headers = {}
  const { headers } = options
  headers.accept = 'application/json'

  if (data) {
    headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  const token = getUserToken()
  if (token) headers.authorization = token

  const response = await fetch(
    `${process.env.REACT_APP_API_URL || ''}${path}`,
    options,
  )

  if (response.status === 401) {
    // Invalid token
    history.push(routes.signIn())
    throw new Error('Unauthorized')
  }

  const contentType = response.headers.get('Content-Type')
  const isJSON = contentType?.includes('application/json')
  const body = await (isJSON ? response.json() : response.text())

  if (!response.ok) throw new Error(body.error || body)

  return body
}

const use = (
  method: <T>(
    path: string,
    data?: unknown,
    requestOptions?: Options,
  ) => Promise<T>,
) => <T>(
  path: string,
  {
    invalidate = [],
    onSuccess,
    requestOptions,
    ...options
  }: {
    invalidate?: string[]
    onSuccess?: (result: T) => void
    requestOptions?: Options
    [key: string]: unknown
  } = {},
) =>
  useMutation<T, { message: string }, unknown>(
    (data) => method(path, data, requestOptions),
    {
      onSuccess: (result: T) => {
        if (onSuccess) onSuccess(result)
        invalidate.forEach((path) => queryCache.invalidateQueries(path))
      },
      ...options,
    },
  )

export const get = <T>(path: string, options?: Options) =>
  request<T>('GET', path, undefined, options)

export const useGet = <T>(
  path: string,
  {
    requestOptions,
    ...useQueryParams
  }: { requestOptions?: Options; [key: string]: unknown } = {},
) => useQuery<T>(path, () => get<T>(path, requestOptions), useQueryParams)

export const post = <T>(path: string, data?: unknown, options?: Options) =>
  request<T>('POST', path, data, options)

export const patch = <T>(path: string, data?: unknown, options?: Options) =>
  request<T>('PATCH', path, data, options)

export const put = <T>(path: string, data?: unknown, options?: Options) =>
  request<T>('PUT', path, data, options)

export const del = <T>(path: string, data?: unknown, options?: Options) =>
  request<T>('DELETE', path, data, options)

export const usePost = use(post)
export const usePatch = use(patch)
export const usePut = use(put)
export const useDelete = use(del)
