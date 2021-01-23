import React from 'react'
import DeleteModal from 'Shared/Modal/Delete'
import api from 'api'
import { filterCache, updateTotal } from 'Notebook/actions'

type Props = {
  checkedIds: Record<number, boolean>
  onClose(): void
}

export default function SentencesDelete({ checkedIds, onClose }: Props) {
  const onDelete = async () => {
    const ids = Object.keys(checkedIds).map((id) => parseInt(id))
    await Promise.all(ids.map((id) => api.notebook.remove({ id })))
    filterCache(({ id }) => !ids.includes(id))
    updateTotal((total) => total - ids.length)
  }

  return <DeleteModal onClose={onClose} onDelete={onDelete} />
}
