import { makeStore, useRecords } from 'utils/Store'
import api from 'api'

export const StudyFlowStore = makeStore({
  fetchList: api.studyFlow.list,
})

export const useStudyFlow = () => useRecords({ store: StudyFlowStore })
