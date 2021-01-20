import { makeAutoObservable } from 'mobx'
import { NotebookSentence, Post, SharedPost } from 'Post/types'
import { getCurrentUser } from 'User/currentUser'
import dayjs from 'dayjs'
import { UploadingImage } from 'utils/imageUploadState'
import { UploadingVideo } from 'utils/videoUploadState'
import { UploadingAudio } from 'Post/Form/RecordAudio/State'
import { Voice } from 'Upload/api'
import { getTaggedEditorHTML } from 'utils/tags'

type Screen =
  | 'form'
  | 'selectTarget'
  | 'youtube'
  | 'sentence'
  | 'tag'
  | 'audio'
  | 'loopingAudio'
  | 'zoom'

type LoopingAudioDraft = {
  url?: string
  text: string
  voices: Voice[]
}

const emptyLoopingAudioDraft: LoopingAudioDraft = {
  url: undefined,
  text: '',
  voices: [],
}

export const createFormState = ({ post }: { post?: Partial<Post> }) => {
  const values = {
    id: post?.id || 0,
    isUploading: true,
    isPublic: post?.isPublic || false,
    addedToSaved: post?.addedToSaved || false,
    classes: post?.classes || [],
    isMine: true,
    isClassOwner: true,
    isClassAdmin: true,
    user: getCurrentUser(),
    date: dayjs(),
    liked: post?.liked || false,
    likesCount: post?.likesCount || 0,
    commentsCount: post?.commentsCount || 0,
    html: getTaggedEditorHTML(post),
    notebookSentence: post?.notebookSentence,
    images: post?.images?.map((url) => ({ isNew: false, url })) || [],
    video: post?.video && { isNew: false, url: post.video },
    audio: post?.audio && { isNew: false, url: post.audio },
    youtubeId: post?.youtubeId,
    loopingAudio: post?.loopingAudio,
    zoomLink: post?.zoomLink,
    sharedPost: post?.sharedPost,
    sLectures: [],
  } as Omit<Post, 'images' | 'video' | 'audio' | 'text' | 'tags'> & {
    html: string
    images: UploadingImage[]
    video?: UploadingVideo
    audio?: UploadingAudio
  }

  type Values = typeof values

  return makeAutoObservable({
    editorRef: { current: null } as { current: null | HTMLDivElement },
    currentScreen: 'form' as Screen,
    selectionRange: undefined as Range | undefined,
    loopingAudioDraft: emptyLoopingAudioDraft,
    setCurrentScreen(screen: Screen) {
      this.currentScreen = screen
    },
    backToForm() {
      this.currentScreen = 'form'
    },
    values,
    setSelectionRange(range: Range) {
      this.selectionRange = range
    },
    setHTML(html: string) {
      this.values.html = html
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
      const { voices } = this.loopingAudioDraft
      const index = voices.indexOf(voice)
      if (index !== -1) voices.splice(index, 1)
      else voices.push(voice)
    },
    updateLoopingAudioDraft(draft: Partial<LoopingAudioDraft>) {
      Object.assign(this.loopingAudioDraft, draft)
    },
    saveLoopingAudio() {
      this.values.loopingAudio = this.loopingAudioDraft?.url
    },
    removeLoopingAudio() {
      this.loopingAudioDraft.url = this.values.loopingAudio = undefined
    },
    setZoomLink(zoomLink?: string) {
      this.values.zoomLink = zoomLink
    },
    setSharedPost(sharedPost?: SharedPost) {
      this.values.sharedPost = sharedPost
    },
    setIsPublic(value: boolean) {
      this.values.isPublic = value
    },
    setClasses(classes: { id: number; name: string }[]) {
      this.values.classes = classes
    },
    get canPost() {
      const values = this.values as Values

      return (
        values.html.trim().length > 0 ||
        values.images.length > 0 ||
        values.video ||
        values.youtubeId ||
        values.audio ||
        values.loopingAudio ||
        values.notebookSentence ||
        values.zoomLink ||
        values.sharedPost
      )
    },
  })
}

export type State = ReturnType<typeof createFormState>
