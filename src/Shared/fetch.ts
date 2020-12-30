import history from 'Shared/history'
import { getUserToken } from 'User/currentUser'
import routes from 'routes'

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type Options = {
  method?: HTTPMethod
  headers?: Record<string, string>
  body?: string | FormData
}

export const request = async <T>(
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
