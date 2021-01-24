import React from 'react'
import cn from 'classnames'
import { UseFormMethods, Controller } from 'react-hook-form'
import { EnglishLevel } from 'User/types'

type Props = {
  // eslint-disable-next-line
  form: UseFormMethods<any>
}

const englishLevels: EnglishLevel[] = ['Basic', 'Intermediate', 'Advanced']

export default function LevelOfEnglish({ form }: Props) {
  return (
    <div className="mb-8">
      <div className="text-lg ml-1 mb-1 uppercase">Level of English</div>
      <div className="flex">
        <Controller
          control={form.control}
          name="englishLevel"
          render={({ value, onChange }) => {
            return (
              <>
                {englishLevels.map((level, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-10 cursor-pointer flex-center border-gray-c5 w-1/3',
                      value === level && 'bg-gray-dc',
                      i === 0 && 'border rounded-l',
                      i !== 0 &&
                        i !== englishLevels.length - 1 &&
                        'border-t border-b',
                      i === englishLevels.length - 1 && 'border rounded-r',
                    )}
                    onClick={() => onChange(level)}
                  >
                    {level}
                  </div>
                ))}
              </>
            )
          }}
        />
      </div>
    </div>
  )
}
