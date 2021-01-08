import { get } from 'Shared/apiUtils'

type ConstantsResponse = {
  result_code: string
  languages: string[]
}

type Constants = {
  languages: string[]
}

export const getAll = get(() => ({
  path: '/v1.2/get_app_constants',
  response: (data: ConstantsResponse): Constants => {
    if (data.result_code !== '21.00') throw new Error('Something went wrong')

    return {
      languages: data.languages,
    }
  },
}))
