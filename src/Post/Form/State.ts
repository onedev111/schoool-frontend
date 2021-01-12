import { makeAutoObservable } from 'mobx'
import { NotebookSentence, Post } from 'Post/types'
import { Link } from 'Post/types'
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

export const createFormState = ({ post }: { post?: Post }) => {
  return makeAutoObservable({
    editorRef: { current: null } as { current: null | HTMLDivElement },
    currentScreen: 'form' as Screen,
    selectionRange: undefined as Range | undefined,
    setCurrentScreen(screen: Screen) {
      this.currentScreen = screen
    },
    backToForm() {
      this.currentScreen = 'form'
    },
    values: {
      id: post?.id || 0,
      isUploading: true,
      isPublic: post?.isPublic || true,
      classIds: post?.classIds || [],
      isMine: true,
      user: getCurrentUser(),
      date: dayjs(),
      liked: post?.liked || false,
      likesCount: post?.likesCount || 0,
      repliesCount: post?.repliesCount || 0,
      saved: false,
      html: getTaggedEditorHTML(post),
      notebookSentence: post?.notebookSentence,
      links: post?.links || [],
      images: post?.images.map((url) => ({ isNew: false, url })) || [],
      video: post?.video && { isNew: false, url: post.video },
      audio: post?.audio && { isNew: false, url: post.audio },
      youtubeId: post?.youtubeId,
      loopingAudioVoices: [],
      loopingAudio: post?.loopingAudio,
    } as Omit<Post, 'images' | 'video' | 'audio' | 'text' | 'tags'> & {
      html: string
      images: UploadingImage[]
      video?: UploadingVideo
      audio?: UploadingAudio
      loopingAudioVoices: Voice[]
    },
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
      const index = this.values.loopingAudioVoices.indexOf(voice)
      if (index !== -1) this.values.loopingAudioVoices.splice(index, 1)
      else this.values.loopingAudioVoices.push(voice)
    },
    setLoopingAudio(url?: string) {
      this.values.loopingAudio = url
    },
    setLinks(links: Link[]) {
      this.values.links = links
    },
    setIsPublic(value: boolean) {
      this.values.isPublic = value
    },
    setClassIds(classIds: number[]) {
      this.values.classIds = classIds
    },
    get canPost() {
      const { values } = this
      return (
        values.html.trim().length > 0 ||
        values.images.length > 0 ||
        values.video ||
        values.youtubeId ||
        values.audio ||
        values.loopingAudio ||
        values.notebookSentence ||
        values.links.length > 0
      )
    },
  })
}

export type State = ReturnType<typeof createFormState>
