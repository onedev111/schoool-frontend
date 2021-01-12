import { request, Options, HTTPMethod } from 'utils/fetch'

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

export const get = <Response, Args extends any[]>(
  fn: (
    ...args: Args
  ) => {
    path: string
    response(data: any): Response
    params?: Record<string, any>
    options?: Options
  },
) => {
  return async (...args: Args) => {
    const { path, response, params, options } = fn(...args)
    return response(
      await request(
        'GET',
        `${path}${paramsToSearch(params)}`,
        undefined,
        options,
      ),
    )
  }
}

const mutate = (method: HTTPMethod) => <Response, Args extends any[]>(
  fn: (
    ...args: Args
  ) => {
    path: string
    response(data: any): Response
    params?: Record<string, any>
    data?: Record<string, any>
    options?: Options
    onSuccess?(): void
  },
) => {
  return async (...args: Args) => {
    const { path, response, params, data, options, onSuccess } = fn(...args)
    const result = response(
      await request(method, `${path}${paramsToSearch(params)}`, data, options),
    )
    if (onSuccess) onSuccess()
    return result
  }
}

export const getMutation = mutate('GET')
export const post = mutate('POST')
