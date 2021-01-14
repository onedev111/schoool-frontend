import { get, post } from 'utils/apiUtils'
import { NotebookSentence } from 'NotebookAndStudyflow/Notebook/types'
import { getUserToken } from 'User/currentUser'

type SentenceResponse = {
  date: string
  in_remember: number
  language: string
  mysen_post_id: number
  notebook: number
  original_content: string
  translated_content: string
  user_id: number
}

export const list = get(
  ({ limit, offset }: { limit: number; offset: number }) => ({
    path: '/notebook/sentence',
    params: {
      access_token: getUserToken(),
      notebook: 0,
      limit_posts: limit,
      num_of_posts: offset,
    },
    response(sentences: SentenceResponse[]): NotebookSentence[] {
      if (!Array.isArray(sentences)) return []

      return sentences.map((sentence) => ({
        id: sentence.mysen_post_id,
        text: sentence.original_content,
        translation: sentence.translated_content,
      }))
    },
  }),
)

export const create = post(
  (sentence: { text: string; translation: string }) => ({
    path: '/notebook/sentence',
    data: {
      access_token: getUserToken(),
      original_content: sentence.text,
      translated_content: sentence.translation,
      notebook: 0,
    },
    async response({
      result_code,
    }: {
      result_code: string
    }): Promise<NotebookSentence> {
      if (result_code !== '11.00') throw new Error('Something went wrong')

      const [sentence] = await list({ limit: 1, offset: 0 })
      if (!sentence) throw new Error('Something went wrong')

      return sentence
    },
  }),
)

export const remove = post(({ id }: { id: number }) => ({
  path: '/delete_my_sentences',
  data: {
    access_token: getUserToken(),
    mysen_post_id: id,
  },
  response({ result_code }: { result_code: string }) {
    if (result_code !== '28.00') throw new Error('Something went wrong')
  },
}))
