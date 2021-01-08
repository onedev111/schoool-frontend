import { makeAutoObservable } from 'mobx'
import { EnglishLevel } from 'User/types'

export default function createProfileFormState() {
  return makeAutoObservable({
    values: {
      avatar: undefined as
        | {
            blob: Blob
            url: string
          }
        | undefined,
      bio: '',
      englishLevel: 'Basic' as EnglishLevel,
      language: 'Chinese',
      location: '',
    },
    setAvatar(avatar?: { blob: Blob; url: string }) {
      this.values.avatar = avatar
    },
    setBio(bio: string) {
      this.values.bio = bio
    },
    setEnglishLevel(level: EnglishLevel) {
      this.values.englishLevel = level
    },
    setLanguage(language: string) {
      this.values.language = language
    },
    setLocation(location: string) {
      this.values.location = location
    },
  })
}

export type State = ReturnType<typeof createProfileFormState>
