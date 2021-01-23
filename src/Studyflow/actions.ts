import { updatePages } from 'utils/queryClient'
import { StudyFlow } from 'Studyflow/types'

export const addToCache = (sentence: StudyFlow) => {
  updatePages<StudyFlow[][]>(['studyFlow'], (pages) =>
    pages.map((page, i) => (i === 0 ? [sentence, ...page] : page)),
  )
}

export const filterCache = (filter: (item: StudyFlow) => boolean) =>
  updatePages<StudyFlow[][]>(['studyFlow'], (pages) =>
    pages.map((page) => page.filter((item) => filter(item))),
  )
