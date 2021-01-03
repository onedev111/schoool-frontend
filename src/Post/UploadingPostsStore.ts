import { makeAutoObservable } from 'mobx'
import { Post } from 'Post/types'
import dayjs from 'dayjs'

let id = 0

export default makeAutoObservable({
  posts: [] as Post[],
  addPost(post: Omit<Post, 'id' | 'date'>) {
    const result = post as Post
    result.id = id++
    result.date = dayjs()
    this.posts.unshift(result)
    return this.posts[0]
  },
  removePost(post: Post) {
    this.posts = this.posts.filter((item) => item !== post)
  },
})
