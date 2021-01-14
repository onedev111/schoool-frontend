import React from 'react'
import DeleteModal from 'Shared/Modal/Delete'
import api from 'api'
import { NotebookStore } from 'Notebook/Store'

type Props = {
  checkedIds: Record<number, boolean>
  onClose(): void
}

export default function SentencesDelete({ checkedIds, onClose }: Props) {
  const onDelete = async () => {
    const ids = Object.keys(checkedIds).map((id) => parseInt(id))
    await Promise.all(ids.map((id) => api.notebook.remove({ id })))
    NotebookStore.setItems(
      NotebookStore.items.filter(({ id }) => !ids.includes(id)),
    )
  }

  return <DeleteModal onClose={onClose} onDelete={onDelete} />
}
