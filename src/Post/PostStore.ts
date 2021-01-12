import { makeAutoObservable } from 'mobx'
import { Post } from 'Post/types'

const PostStore = makeAutoObservable({
  posts: [] as Post[],
  setPages(pages: Post[][] = []) {
    this.posts = pages.flat()
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
})

export default PostStore
