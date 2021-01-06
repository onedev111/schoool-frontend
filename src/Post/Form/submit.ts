import { State } from 'Post/Form/State'
import UploadingPostsStore from 'Post/UploadingPostsStore'
import api from 'api'
import { queryCache } from 'react-query'
import dayjs from 'dayjs'
import { Post } from 'Post/types'
import { UploadingAudio } from 'Post/Form/RecordAudio/State'
import { UploadingVideo } from 'utils/videoUploadState'

export default async function submitPost({ state }: { state: State }) {
  const { images, video, audio } = state.values
  const videos = [video].filter((video) => video) as UploadingVideo[]
  const audios = [audio].filter((audio) => audio) as UploadingAudio[]

  const post: Post = {
    ...state.values,
    images: images
      .map(({ preview }) => preview)
      .filter((preview) => preview) as string[],
    video: video && URL.createObjectURL(video),
    audio: audio && audio.url,
    date: dayjs(),
  }
  const observablePost = UploadingPostsStore.addPost(post)

  const photoCount = images.length
  const videoCount = videos.length
  const soundCount = audios.length

  if (Math.max(photoCount, videoCount, soundCount) > 0) {
    const urls = await api.fileUpload.getUploadingUrls({
      photoCount,
      videoCount,
      soundCount,
    })
    try {
      await Promise.all([
        ...images.map((image, index) => {
          const upload = urls.photos[index]

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: image.file,
          }).then(() => (observablePost.images[index] = upload.cdnUrl))
        }),
        ...videos.map((video, index) => {
          const upload = urls.videos[index]

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: video,
          }).then(() => (observablePost.video = upload.cdnUrl))
        }),
        ...audios.map((audio, index) => {
          const upload = urls.sounds[index]

          return fetch(upload.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: audio.blob,
          }).then(() => (observablePost.audio = upload.cdnUrl))
        }),
      ])
    } catch (err) {
      observablePost.error = err.message
      return
    }
  }

  try {
    await api.post.create(observablePost)
    queryCache.invalidateQueries(['posts'])
    UploadingPostsStore.removePost(observablePost)
  } catch (err) {
    post.error = err.message
  }
}
