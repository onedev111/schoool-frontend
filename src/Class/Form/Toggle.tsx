import React from 'react'
import { UseFormMethods, Controller } from 'react-hook-form'
import cn from 'classnames'

type Props = {
  form: { control: UseFormMethods['control'] }
  name: string
  options: Record<string, boolean>
  children: React.ReactNode
}

export default function Toggle({ form, name, options, children }: Props) {
  return (
    <>
      <Controller
        control={form.control}
        name={name}
        render={({ value, onChange }) => {
          return (
            <div className="flex h-11 rounded text-lg bg-gray-ef">
              {Object.keys(options).map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => onChange(options[label])}
                  className={cn(
                    'w-1/2 rounded flex-center cursor-pointer',
                    value === options[label] &&
                      'bg-white border border-gray-97',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )
        }}
      />
      <div className="mt-4 text-lg text-gray-2a">{children}</div>
    </>
  )
}
