import { makeAutoObservable } from 'mobx'
import { Comment } from 'Post/Comment/types'
import api from 'api'

const CommentStore = makeAutoObservable({
  postId: undefined as number | undefined,
  comments: undefined as Comment[] | undefined,
  isFetching: false,
  error: undefined as Error | undefined,
  highlightedComment: undefined as Comment | undefined,
  setIsFetching(value: boolean) {
    this.isFetching = value
  },
  setError(error?: Error) {
    this.error = error
  },
  resetComments() {
    this.comments = undefined
    this.highlightedComment = undefined
  },
  addComment({
    comment,
    highlight,
  }: {
    comment: Comment
    highlight?: boolean
  }) {
    this.comments?.push(comment)
    if (highlight && this.comments)
      this.highlightedComment = this.comments[this.comments.length - 1]
  },
  setHighlightedComment(comment?: Comment) {
    this.highlightedComment = comment
  },
  async fetch({ postId }: { postId: number }) {
    if (this.isFetching && this.postId === postId) return
    if (this.postId !== postId) {
      this.postId = postId
      this.comments = undefined
    }
    this.setIsFetching(true)

    try {
      const comments = await api.comment.list({ postId: this.postId })
      this.comments = comments
      this.setError()
    } catch (err) {
      this.setError(err)
    }

    this.setIsFetching(false)
  },
})

export default CommentStore
