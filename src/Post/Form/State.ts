import { makeAutoObservable } from 'mobx'
import { NotebookSentence, Post } from 'Post/types'
import { Preview } from 'Post/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import { UploadingImage } from 'utils/imageUploadState'
import { UploadingVideo } from 'utils/videoUploadState'
import { UploadingAudio } from 'Post/Form/RecordAudio/State'
import { Voice } from 'Upload/api'

type Screen =
  | 'form'
  | 'privacy'
  | 'youtube'
  | 'sentence'
  | 'tag'
  | 'audio'
  | 'loopingAudio'

let id = 0

export const createFormState = () =>
  makeAutoObservable({
    editorRef: { current: null } as { current: null | HTMLDivElement },
    currentScreen: 'form' as Screen,
    selectionRange: undefined as
      | {
          startContainer: Node
          endContainer: Node
          startOffset: number
          endOffset: number
        }
      | undefined,
    setCurrentScreen(screen: Screen) {
      this.currentScreen = screen
    },
    backToForm() {
      this.currentScreen = 'form'
    },
    values: {
      id: id--,
      isMine: true,
      user: getCurrentUser(),
      date: dayjs(),
      liked: false,
      likesCount: 0,
      repliesCount: 0,
      saved: false,
      html: '',
      privacy: 'Only for me',
      notebookSentence: undefined as NotebookSentence | undefined,
      previews: [] as Preview[],
      images: [],
      video: undefined,
      youtubeId: undefined,
      loopingAudioVoices: [],
      loopingAudio: undefined,
    } as Omit<Post, 'images' | 'video' | 'audio' | 'text' | 'tags'> & {
      html: string
      privacy: string
      images: UploadingImage[]
      video?: UploadingVideo
      audio?: UploadingAudio
      loopingAudioVoices: Voice[]
    },
    setHTML(html: string) {
      this.values.html = html
    },
    setPrivacy(privacy: string) {
      this.values.privacy = privacy
    },
    setSentence(sentence?: NotebookSentence) {
      this.values.notebookSentence = sentence
    },
    setImages(images: UploadingImage[]) {
      this.values.images = images
    },
    setVideo(video: UploadingVideo | undefined) {
      this.values.video = video
    },
    setYouTubeId(id: string | undefined) {
      this.values.youtubeId = id
    },
    setAudio(audio?: UploadingAudio) {
      this.values.audio = audio
    },
    toggleLoopingAudioVoice(voice: Voice) {
      const index = this.values.loopingAudioVoices.indexOf(voice)
      if (index !== -1) this.values.loopingAudioVoices.splice(index, 1)
      else this.values.loopingAudioVoices.push(voice)
    },
    setLoopingAudio(url?: string) {
      this.values.loopingAudio = url
    },
    openTagModal() {
      const range = window.getSelection()?.getRangeAt(0)
      const parent = range?.endContainer.parentElement
      this.selectionRange =
        (range &&
          parent &&
          parent.closest('.js-editor') && {
            startContainer: range.startContainer,
            endContainer: range.endContainer,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
          }) ||
        undefined
      this.currentScreen = 'tag'
    },
    get isValid() {
      return this.values.html.trim().length > 0
    },
  })

export type State = ReturnType<typeof createFormState>
