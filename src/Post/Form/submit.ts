import { State } from 'Post/Form/State'
import api from 'api'
import dayjs from 'dayjs'
import { UploadingAudio } from 'Post/Form/RecordAudio/State'
import { UploadingVideo } from 'utils/videoUploadState'
import { Post } from 'Post/types'
import { getTextAndTagsFromEditor } from 'utils/tags'
import { addToCache, updateCache } from 'Post/cacheActions'

let postId = -1

export default async function submitPost({ state }: { state: State }) {
  const editor = state.editorRef.current as HTMLDivElement
  state.onHTMLPaste(editor.innerHTML)

  const { images, video, audio } = state.values

  const { text, tags } = getTextAndTagsFromEditor({ editor })

  const post: Post = {
    ...state.values,
    text,
    tags,
    images: images.map(({ url }) => url).filter((url) => url) as string[],
    video: video && video.url,
    audio: audio && audio.url,
    date: dayjs(),
  }

  const tempId = post.id === 0 ? postId-- : undefined
  console.log('add post', post)
  if (tempId) addToCache({ ...post, id: tempId })
  else updateCache(post.id, post)

  const uploadingImages: { file: File; index: number }[] = []
  images.forEach((image, index) => {
    if (image.isNew) uploadingImages.push({ file: image.file, index })
  })

  const photoCount = uploadingImages.length

  const videos = [video].filter((video) => video) as UploadingVideo[]
  const uploadingVideos: { file: File }[] = []
  videos.forEach((video) => {
    if (video.isNew) uploadingVideos.push({ file: video.file })
  })

  const videoCount = uploadingVideos.length

  const audios = [audio].filter((audio) => audio) as UploadingAudio[]
  const uploadingAudios: { blob: Blob }[] = []
  audios.forEach((audio) => {
    if (audio.isNew) uploadingAudios.push({ blob: audio.blob })
  })
  const soundCount = audios.length

  if (Math.max(photoCount, videoCount, soundCount) > 0) {
    const urls = await api.upload.getUploadingUrls({
      photoCount,
      videoCount,
      soundCount,
    })

    try {
      await Promise.all([
        ...uploadingImages.map((image, index) => {
          const upload = urls.photos[index]

          return api.upload
            .upload({ url: upload.url, data: image.file })
            .then(() => (post.images[image.index] = upload.cdnUrl))
        }),
        ...uploadingVideos.map((video, index) => {
          const upload = urls.videos[index]

          return api.upload
            .upload({ url: upload.url, data: video.file })
            .then(() => (post.video = upload.cdnUrl))
        }),
        ...uploadingAudios.map((audio, index) => {
          const upload = urls.sounds[index]

          return api.upload
            .upload({ url: upload.url, data: audio.blob })
            .then(() => (post.audio = upload.cdnUrl))
        }),
      ])
    } catch (err) {
      post.error = err.message
      return
    }
  }

  try {
    const id = await api.post.save(post)
    updateCache(tempId || post.id, {
      id: tempId ? id : post.id,
      isUploading: false,
    })
  } catch (err) {
    post.error = err.message
  }
}
