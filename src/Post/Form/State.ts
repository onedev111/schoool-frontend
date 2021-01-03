import { makeAutoObservable } from 'mobx'
import { Sentence } from 'Post/types'
import { Preview } from 'Post/types'

type Screen =
  | 'form'
  | 'privacy'
  | 'youtube'
  | 'sentence'
  | 'tag'
  | 'audio'
  | 'loopingAudio'

export const createFormState = () =>
  makeAutoObservable({
    editorRef: { current: null },
    currentScreen: 'form' as Screen,
    setCurrentScreen(screen: Screen) {
      this.currentScreen = screen
    },
    backToForm() {
      this.currentScreen = 'form'
    },
    values: {
      text: '',
      privacy: 'Only for me',
      sentence: null as Sentence | null,
      previews: [] as Preview[],
    },
    setText(text: string) {
      this.values.text = text
    },
    setPrivacy(privacy: string) {
      this.values.privacy = privacy
    },
    setSentence(sentence: Sentence | null) {
      this.values.sentence = sentence
    },
    get isValid() {
      return this.values.text.trim().length > 0
    },
  })

export type State = ReturnType<typeof createFormState>
