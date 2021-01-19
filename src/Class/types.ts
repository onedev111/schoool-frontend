export type Class = {
  id: number
  name: string
  description: string
  isPublic: boolean
  isLocked: boolean
  isOwner: boolean
  image: string
  autoApprove: boolean
  owner: {
    id: number
    name: string
  }
}
