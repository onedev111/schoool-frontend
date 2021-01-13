import React from 'react'
import { UseFormMethods, Controller, useFieldArray } from 'react-hook-form'
import cn from 'classnames'

type Props = {
  form: UseFormMethods<any>
}

const fieldsDef = [
  {
    name: 'questionEnglish',
    className: 'bg-gray-e2 px-3 py-2 w-full mb-1',
    placeholder: 'Question in English',
  },
  {
    name: 'questionNative',
    className: 'bg-gray-e2 px-3 py-2 w-full mb-1',
    placeholder: 'Question in your native language',
  },
  {
    name: 'answerEnglish',
    className: 'bg-gray-f7 px-3 py-2 w-full mb-1',
    placeholder: 'Answer in English',
  },
  {
    name: 'answerNative',
    className: 'bg-gray-f7 px-3 py-2 w-full mb-1',
    placeholder: 'Answer in your native language',
  },
]

export default function Expressions({ form }: Props) {
  const { errors, control } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expressions',
  })
  const fieldsLen = fields.length

  return (
    <>
      <div className="pt-7 px-4 pb-2 text-blue-9e text-17">Add Expressions</div>
      {fields.map((field, index) => {
        const isLast = index === fieldsLen - 1

        return (
          <>
            {fieldsDef.map(({ name, className, placeholder }) => {
              return (
                <Controller
                  control={control}
                  name={`expressions[${index}].${name}`}
                  render={({ value, name, onChange, onBlur }) => {
                    const error = errors[name]

                    return (
                      <div>
                        <input
                          className={className}
                          name={name}
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder={placeholder}
                        />
                        {error && (
                          <div className="text-red-600 mb-2 px-4">
                            {error.message}
                          </div>
                        )}
                      </div>
                    )
                  }}
                />
              )
            })}
            <div
              className={cn(
                'flex h-16 items-center px-4',
                isLast ? 'justify-between' : 'justify-end',
              )}
            >
              {isLast && (
                <button
                  type="button"
                  className="bg-gray-35 text-white flex-center rounded-full"
                  style={{ width: '95px' }}
                  onClick={() =>
                    append({
                      questionEnglish: '',
                      questionNative: '',
                      answerEnglish: '',
                      answerNative: '',
                    })
                  }
                >
                  Add More
                </button>
              )}
              {fieldsLen > 1 && (
                <button
                  type="button"
                  className="border border-gray-35 text-gray-35 flex-center rounded-full"
                  style={{ width: '95px', borderWidth: '2px' }}
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              )}
            </div>
          </>
        )
      })}
    </>
  )
}
