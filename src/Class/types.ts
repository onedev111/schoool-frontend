export type Class = {
  id: number
  name: string
  description: string
  isPublic: boolean
  isLocked: boolean
  isOwn: boolean
  isJoined: boolean
  completed: boolean
  image: string
  autoApprove: boolean
  owner: {
    id: number
    name: string
  }
}
