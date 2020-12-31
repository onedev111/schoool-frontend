export type Preview =
  | { type: 'post' | 'studyflow'; title: string; text: string }
  | { type: 'link'; image: string; title: string; text: string }

export type Video = {
  src: string
  ratio: number
}

export type Sentence = {
  english: string
  translation: string
}

export type Post = {
  id: number
  text: string
  joinedToClass?: boolean
  audio?: string
  loopingAudio?: string
  previews: Preview[]
  image?: string
  video?: Video
  reachedNotebookLimit?: boolean
  date: Date
}

export type Comment = {
  avatar: string
  name: string
  replyId?: number
  date: Date
  liked: number
  comment: string
  previews?: Preview[]
  audio?: string
  loopingAudio?: string
  image?: string
  video?: Video
  comments?: Comment[]
}
