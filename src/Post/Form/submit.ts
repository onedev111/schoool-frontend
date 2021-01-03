import { State } from 'Post/Form/State'
import UploadingPostsStore from 'Post/UploadingPostsStore'
import api from 'api'
import { queryCache } from 'react-query'

export default async function submitPost({ state }: { state: State }) {
  const post = UploadingPostsStore.addPost(state.values)
  post.error = 'error'
  // try {
  //   await api.post.create(state.values)
  //   queryCache.invalidateQueries(['posts'])
  //   UploadingPostsStore.removePost(post)
  // } catch (err) {
  //   post.error = err.message
  // }
}
