import { State } from 'Post/Form/State'
import api from 'api'
import dayjs from 'dayjs'
import { UploadingAudio } from 'Post/Form/RecordAudio/State'
import { UploadingVideo } from 'utils/videoUploadState'
import PostStore from 'Post/PostStore'
import { Post } from 'Post/types'
import { getTextAndTagsFromEditor } from 'utils/tags'

export default async function submitPost({ state }: { state: State }) {
  const { images, video, audio } = state.values

  const { text, tags } = getTextAndTagsFromEditor({
    editor: state.editorRef.current as HTMLDivElement,
  })

  const postData: Post = {
    ...state.values,
    text,
    tags,
    images: images.map(({ url }) => url).filter((url) => url) as string[],
    video: video && video.url,
    audio: audio && audio.url,
    date: dayjs(),
  }

  const { id } = state.values
  const updatingPost =
    id !== 0 && PostStore.posts.find((post) => post.id === id)
  const post = updatingPost
    ? PostStore.updatePost(updatingPost, postData)
    : PostStore.unshiftPost(postData)

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

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: image.file,
          }).then(() => (post.images[image.index] = upload.cdnUrl))
        }),
        ...uploadingVideos.map((video, index) => {
          const upload = urls.videos[index]

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: video.file,
          }).then(() => (post.video = upload.cdnUrl))
        }),
        ...uploadingAudios.map((audio, index) => {
          const upload = urls.sounds[index]

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: audio.blob,
          }).then(() => (post.audio = upload.cdnUrl))
        }),
      ])
    } catch (err) {
      post.error = err.message
      return
    }
  }

  try {
    await api.post.save(post)
    PostStore.updatePost(post, { isUploading: false })
  } catch (err) {
    post.error = err.message
  }
}
