import { State } from 'Post/Form/State'
import UploadingPostsStore from 'Post/UploadingPostsStore'
import api from 'api'
import { queryCache } from 'react-query'
import dayjs from 'dayjs'
import { Post } from 'Post/types'

export default async function submitPost({ state }: { state: State }) {
  const { images } = state.values

  const post: Post = {
    ...state.values,
    images: images
      .map(({ preview }) => preview)
      .filter((preview) => preview) as string[],
    date: dayjs(),
  }
  const observablePost = UploadingPostsStore.addPost(post)
  const photoCount = images.length

  if (photoCount > 0) {
    const urls = await api.fileUpload.getUploadingUrls({ photoCount })
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
