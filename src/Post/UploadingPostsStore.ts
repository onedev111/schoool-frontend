import { makeAutoObservable } from 'mobx'
import { Post } from 'Post/types'

export default makeAutoObservable({
  posts: [] as Post[],
  addPost(post: Post) {
    this.posts.unshift(post)
    return this.posts[0]
  },
  removePost(post: Post) {
    this.posts = this.posts.filter((item) => item !== post)
  },
})
