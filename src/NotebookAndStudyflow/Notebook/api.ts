import { post } from 'utils/apiUtils'
import { NotebookSentence } from 'NotebookAndStudyflow/Notebook/types'
import { getUserToken } from 'User/currentUser'

type SentenceResponse = {
  id: number
  title: string
  user_id: number
  is_public: number
  profile_image: string
  language: string
  lingo_id: number
  pad_id: number
  notebook_id: number
  type: number
  level: number
  theme: string
  description: string
  date: string
  username: string
  user_profile: string
  shared_users: string
  shared_classes: string
  added_users: string
  sentences: string
}

export const create = post((sentence: NotebookSentence) => ({
  path: '/notebook/sentence',
  data: {
    access_token: getUserToken(),
    original_content: sentence.text,
    translated_content: sentence.translation,
  },
  response({
    result_code,
  }: {
    result_code: string
    sentence: SentenceResponse
  }): NotebookSentence {
    if (result_code !== '11.00') throw new Error('Something went wrong')

    return sentence
  },
}))
