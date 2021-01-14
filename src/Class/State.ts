import { makeAutoObservable } from 'mobx'

export default makeAutoObservable({
  openCreateModal: false,
  toggleCreateModal() {
    this.openCreateModal = !this.openCreateModal
  },
})
