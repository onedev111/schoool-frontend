export type Class = {
  id: number
  name: string
  isPublic: boolean
  isOwner: boolean
  image: string
  owner: {
    id: number
    name: string
  }
}
