import { Dayjs } from 'dayjs'

export type CurrentUser = {
  isNew: boolean
  isInstructor: boolean
  id: number
  token: string
  name: string
  email: string
  avatar: string
  language: string
  location: string
  englishLevel: EnglishLevel
}

export type User = {
  id: number
  name: string
  avatar: string
  bio: string
  language: string
  englishLevel: EnglishLevel
  location: string
  followersCount: number
  followingCount: number
  createdAt: Dayjs
}

export type UserToFollow = {
  id: number
  name: string
  avatar: string
  isFollowing: boolean
}

export type EnglishLevel = 'Basic' | 'Intermediate' | 'Advanced'
