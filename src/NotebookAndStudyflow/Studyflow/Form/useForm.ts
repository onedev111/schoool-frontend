import React from 'react'
import { StudyFlowType } from 'NotebookAndStudyflow/Studyflow/types'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'

// eslint-disable-next-line
function createSchema<T extends object | undefined>(expressionObject: T) {
  return yup.object({
    title: yup.string().required(),
    level: yup.string().oneOf(['basic', 'intermediate', 'advanced']).required(),
    privacy: yup.string().required(),
    expressions: yup.array(yup.object(expressionObject).required()).required(),
  })
}

export default function useStudyFlowForm({ type }: { type: StudyFlowType }) {
  const [schema] = React.useState(() => {
    const expressionObject =
      type === 'conversation'
        ? {
            question: yup.string().label('Question in English').required(),
            questionNative: yup
              .string()
              .label('Question in native language')
              .required(),
            answer: yup.string().label('Answer in English').required(),
            answerNative: yup
              .string()
              .label('Answer in native language')
              .required(),
          }
        : {
            sentence: yup.string().label('Sentence in English').required(),
            sentenceNative: yup
              .string()
              .label('Sentence in native language')
              .required(),
          }

    return createSchema(expressionObject)
  })

  const form = useForm({
    schema,
    defaultValues: {
      title: '',
      label: '',
      privacy: '',
      expressions: [
        {
          question: '',
          questionNative: '',
          answer: '',
          answerNative: '',
        },
      ],
    },
  })

  return form
}
