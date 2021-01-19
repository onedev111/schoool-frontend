export type User = {
  isNew: boolean
  isInstructor: boolean
  id: number
  token: string
  name: string
  email: string
  avatar: string
}

export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced'
