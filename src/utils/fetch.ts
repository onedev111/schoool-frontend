import history from 'utils/history'
import { getUserToken } from 'User/currentUser'
import routes from 'routes'
import Form from 'Studyflow/Form'
import { array } from 'yup'

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type Options = {
  method?: HTTPMethod
  headers?: Record<string, string>
  body?: string | FormData | Blob | File
}

const paramsToSearch = (
  params?: Record<string, string | number | undefined>,
) => {
  if (!params) return ''

  const filtered: Record<string, string> = {}
  for (const key in params)
    if (params[key] !== undefined) filtered[key] = params[key] as string

  const str = new URLSearchParams(filtered).toString()
  return str ? `?${str}` : ''
}

export const request = async <T>({
  method,
  url,
  path,
  params,
  data,
  options = {},
  auth = true,
}: {
  method: HTTPMethod
  url?: string
  path?: string
  params?: Record<string, string | number | undefined>
  data?: unknown
  options?: Options
  auth?: boolean
}): Promise<T> => {
  options.method = method
  if (!options.headers) options.headers = {}
  const { headers } = options
  headers.accept = 'application/json'

  if (data) {
    const formData = new FormData()
    const record = data as Record<string, string>
    for (const key in record) {
      const value = record[key]
      if (Array.isArray(value)) {
        const arrayKey = `${key}[]`
        value.forEach((item) => formData.append(arrayKey, item))
      } else if (value !== undefined) formData.append(key, value)
    }
    options.body = formData
  }

  if (auth) {
    const token = getUserToken()
    if (token) headers.authorization = token
  }

  const response = await fetch(
    `${url || `${process.env.REACT_APP_API_URL}${path}`}${paramsToSearch(
      params,
    )}`,
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
