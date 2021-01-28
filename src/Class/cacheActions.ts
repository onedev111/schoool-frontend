import { queryClient, updateData } from 'utils/queryClient'
import { Class } from 'Class/types'

export const resetClasses = () =>
  queryClient.invalidateQueries(['class'], { exact: true })

export const resetClass = ({ id }: { id: number }) =>
  queryClient.invalidateQueries(['class', id], { exact: true })

export const updateClassCache = (id: number, update: Partial<Class>) => {
  updateData<Class>(['class', id], (data) => ({ ...data, ...update }))
}
