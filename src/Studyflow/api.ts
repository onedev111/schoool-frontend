import { del, get, post } from 'utils/apiUtils'
import { getUserToken } from 'User/currentUser'
import {
  ConversationExpression,
  Expression,
  RepetitionExpression,
  StudyFlow,
  StudyFlowLevel,
  StudyFlowType,
} from 'Studyflow/types'

const levelToNumber: Record<StudyFlowLevel, number> = {
  basic: 0,
  intermediate: 1,
  advanced: 2,
}

const levelFromNumber: Record<number, StudyFlowLevel> = {
  0: 'basic',
  1: 'intermediate',
  2: 'advanced',
}

const typeToNumber: Record<StudyFlowType, number> = {
  conversation: 0,
  repetition: 1,
}

const typeFromNumber: Record<number, StudyFlowType> = {
  0: 'conversation',
  1: 'repetition',
}

type StudyFlowResponse = {
  date: string
  description: string
  flow_order: number
  from_bank: number
  id: number
  is_public: number
  language: string
  level: number
  lingo_id: number
  notebook_id: number
  pad_id: number
  profile_image: string
  sentence_count: number
  sentences: string
  shared_classes: string
  shared_users: string
  theme: string
  title: string
  type: number
  user_id: number
  user_profile: string
  username: string
}

export const list = get(() => ({
  path: '/study_flow/list',
  params: {
    access_token: getUserToken(),
  },
  response(studyFlows: StudyFlowResponse[]): StudyFlow[] {
    return studyFlows.map((flow) => ({
      id: flow.id,
      title: flow.title,
      isPublic: Boolean(flow.is_public),
      type: typeFromNumber[flow.type],
      level: levelFromNumber[flow.level],
    }))
  },
}))

export const create = post(
  (
    flow: Omit<StudyFlow, 'id'> & {
      userIds: number[]
      expressions: Expression[]
    },
  ) => ({
    path: '/study_flow',
    data: {
      access_token: getUserToken(),
      theme: 'Everyday Expression',
      description: flow.title,
      title: flow.title,
      level: levelToNumber[flow.level],
      is_public: flow.isPublic ? 1 : 0,
      type: typeToNumber[flow.type],
      shared_users: JSON.stringify(flow.userIds),
      profile_image_dir:
        'http://dzh6ulgfepbq.cloudfront.net/study_flow/photo/cover/2-1.png',
      expressions: JSON.stringify(
        flow.type === 'conversation'
          ? (flow.expressions as ConversationExpression[]).map((expr) => ({
              question: expr.question,
              native: expr.questionNative,
              answers: [
                {
                  answer: expr.answer,
                  native: expr.answerNative,
                },
              ],
            }))
          : (flow.expressions as RepetitionExpression[]).map((expr) => ({
              question: expr.sentence,
              native: expr.sentenceNative,
              answers: [],
            })),
      ),
    },
    response({
      result_code,
      data,
    }: {
      result_code: string
      data: { id: number }
    }): StudyFlow {
      if (result_code !== '01.00') throw new Error('Something went wrong')

      return {
        ...flow,
        id: data.id,
      }
    },
  }),
)

export const remove = del(({ id }: { id: number }) => ({
  path: `/study_flow/${id}`,
  params: {
    access_token: getUserToken(),
  },
  response({ result_code }: { result_code: string }) {
    if (result_code !== '07.00') throw new Error('Something went wrong')
  },
}))

type SearchFriendsResponse = {
  user_id: number
  name: string
  profile_image_dir: string
  type: number
  priority: number
}

export const searchFriendsToShareWith = get(
  ({ search }: { search?: string } = {}) => ({
    path: '/study_flow/for_tag',
    params: {
      access_token: getUserToken(),
      limit_posts: 0,
      num_of_posts: 0,
      remove_self: 1,
      search_key: search,
    },
    response({
      result_code,
      data,
    }: {
      result_code: string
      data: SearchFriendsResponse[]
    }) {
      if (result_code !== '17.00') throw new Error('Something went wrong')

      return data
        .filter((user) => user.type === 1)
        .map((user) => ({
          id: user.user_id,
          name: user.name,
          avatar: user.profile_image_dir,
        }))
    },
  }),
)
