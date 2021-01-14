export type StudyFlowLevel = 'basic' | 'intermediate' | 'advanced'

export type StudyFlowType = 'conversation' | 'repetition'

export type StudyFlow = {
  id: number
  isPublic: boolean
  title: string
  type: StudyFlowType
  level: StudyFlowLevel
}

export type ConversationExpression = {
  question: string
  questionNative: string
  answer: string
  answerNative: string
}

export type RepetitionExpression = {
  sentence: string
  sentenceNative: string
}

export type Expression = ConversationExpression | RepetitionExpression
