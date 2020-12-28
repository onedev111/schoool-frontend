import React from 'react'
import cn from 'classnames'
import { UseFormMethods, Controller } from 'react-hook-form'

type Props = {
  form: UseFormMethods<{ level: string }>
  options: string[]
  className?: string
  [key: string]: unknown
}

export default function SelectRow({
  form,
  options,
  className,
  ...props
}: Props) {
  const { register } = form
  const last = options.length - 1

  return (
    <Controller
      name="level"
      control={form.control}
      render={({ value, onChange }) => {
        return (
          <div className={cn('flex', className)} {...props}>
            {options.map((option, i) => (
              <label
                className={cn(
                  'flex-center w-full h-8 border border-gray-71 text-sm cursor-pointer',
                  value === option
                    ? 'text-white bg-gray-71'
                    : 'bg-white text-gray-71',
                  i === 0 && 'rounded-tl-lg rounded-bl-lg',
                  i === last && 'rounded-tr-lg rounded-br-lg',
                  i !== 0 && 'border-l-0',
                )}
              >
                <input
                  ref={register}
                  type="radio"
                  name={name}
                  hidden
                  checked={value === option}
                  onChange={() => onChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )
      }}
    />
  )
}
