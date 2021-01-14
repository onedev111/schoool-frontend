import React from 'react'
import {
  Expression,
  StudyFlow,
  StudyFlowLevel,
  StudyFlowType,
} from 'NotebookAndStudyflow/Studyflow/types'
import { useMutation } from 'react-query'
import api from 'api'
import { StudyFlowStore } from 'NotebookAndStudyflow/Studyflow/Store'

export default function useCreateStudyFlow({
  type,
  setError,
  isPublic,
  userIds,
}: {
  type: StudyFlowType
  setError(error?: Error): void
  isPublic: boolean
  userIds: number[]
}) {
  const [createdStudyFlow, setCreatedStudyFlow] = React.useState<StudyFlow>()
  const [performCreate, { isLoading: isCreating }] = useMutation(
    api.studyFlow.create,
    {
      onSettled(flow, error) {
        if (error) {
          setError(error as Error)
        } else if (flow) {
          setCreatedStudyFlow(flow)
          StudyFlowStore.unshift(flow)
        }
      },
    },
  )

  const create = (values: {
    title: string
    level: StudyFlowLevel
    expressions: Expression[]
  }) => {
    if (!values || isCreating || createdStudyFlow) return

    performCreate({
      type,
      title: values.title,
      level: values.level,
      isPublic,
      userIds,
      expressions: values.expressions,
    })
  }

  return {
    create,
    createdStudyFlow,
    isCreating,
  }
}
