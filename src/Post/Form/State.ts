import { makeAutoObservable } from 'mobx'
import { NotebookSentence, Post } from 'Post/types'
import { Preview } from 'Post/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import { UploadingImage } from 'utils/imageUploadState'
import { UploadingVideo } from 'utils/videoUploadState'

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
    editorRef: { current: null },
    currentScreen: 'form' as Screen,
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
      text: '',
      privacy: 'Only for me',
      notebookSentence: undefined as NotebookSentence | undefined,
      previews: [] as Preview[],
      images: [],
      video: undefined,
      youtubeId: undefined,
    } as Omit<Post, 'images' | 'video'> & {
      privacy: string
      images: UploadingImage[]
      video: UploadingVideo | undefined
    },
    setText(text: string) {
      this.values.text = text
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
    get isValid() {
      return this.values.text.trim().length > 0
    },
  })

export type State = ReturnType<typeof createFormState>
