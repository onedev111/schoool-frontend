import { request, Options, HTTPMethod } from 'utils/fetch'

// eslint-disable-next-line
export const get = <Args extends any[], Response = void>(
  fn: (
    ...args: Args
  ) => {
    url?: string
    path?: string
    // eslint-disable-next-line
    response(data: any): Response
    params?: Record<string, string | number | undefined>
    options?: Options
    auth?: boolean
  },
) => {
  return async (...args: Args) => {
    const props = fn(...args)
    const { response, url, path, params, options, auth } = props
    return response(
      await request({
        method: 'GET',
        url,
        path,
        params,
        options,
        auth,
      }),
    )
  }
}

// eslint-disable-next-line
const mutate = (method: HTTPMethod) => <Args extends any[], Response = void>(
  fn: (
    ...args: Args
  ) => {
    url?: string
    path?: string
    // eslint-disable-next-line
    response?(data: any): Response
    // eslint-disable-next-line
    params?: Record<string, string | number | undefined>
    headers?: Record<string, string>
    // eslint-disable-next-line
    data?: Record<string, any>
    body?: string | FormData | Blob | File
    options?: Options
    auth?: boolean
    onSuccess?(): void
  },
) => {
  return async (...args: Args) => {
    const props = fn(...args)
    const {
      url,
      path,
      response,
      params,
      headers,
      data,
      body,
      onSuccess,
      auth,
    } = props

    let { options } = props
    if (headers) {
      if (!options) options = {}
      options.headers = headers
    }

    if (body) {
      if (!options) options = {}
      options.body = body
    }

    const requestResult = await request({
      method,
      url,
      path,
      params,
      data,
      options,
      auth,
    })

    const result = response ? await response(requestResult) : undefined
    if (onSuccess) onSuccess()
    return result as Response
  }
}

export const getMutation = mutate('GET')
export const post = mutate('POST')
export const put = mutate('PUT')
export const del = mutate('DELETE')
