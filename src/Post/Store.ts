import { makeAutoObservable } from 'mobx'
import { Post } from 'Post/types'
import api from 'api'

const postsPerPage = 5

const PostStore = makeAutoObservable({
  posts: [] as Post[],
  canFetchMore: true,
  isFetching: false,
  error: undefined as Error | undefined,
  setCanFetchMore(value: boolean) {
    this.canFetchMore = value
  },
  setIsFetching(value: boolean) {
    this.isFetching = value
  },
  setError(error?: Error) {
    this.error = error
  },
  setPosts(posts: Post[]) {
    this.posts = posts
  },
  appendPosts(posts: Post[]) {
    this.posts.push(...posts)
  },
  unshiftPost(post: Post) {
    this.posts.unshift(post)
    return this.posts[0]
  },
  updatePost(post: Post, params: Partial<Post>) {
    Object.assign(post, params)
    return post
  },
  removePost(post: Post) {
    this.posts = this.posts.filter((item) => item !== post)
  },
  async fetch({ reset }: { reset?: boolean } = {}) {
    if ((!reset && !PostStore.canFetchMore) || PostStore.isFetching) return
    PostStore.setIsFetching(true)

    try {
      const posts = await api.post.list({
        limit: postsPerPage,
        offset: reset ? 0 : this.posts.length,
      })

      if (posts.length === 0) PostStore.setCanFetchMore(false)
      else if (reset) PostStore.setPosts(posts)
      else PostStore.appendPosts(posts)
      PostStore.setError()
    } catch (error) {
      PostStore.setError(error)
    }

    PostStore.setIsFetching(false)
  },
})

export default PostStore
