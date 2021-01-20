import React from 'react'
import cn from 'classnames'
import { UseFormMethods, Controller } from 'react-hook-form'
import Dropdown from 'Shared/Dropdown'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'

type Props = {
  // eslint-disable-next-line
  form: UseFormMethods<any>
  name: string
  options: Record<string, string>
  className?: string
}

export default function Select({ form, name, options, className }: Props) {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ value, onChange }) => {
        return (
          <Dropdown
            isOpen={isOpen}
            setOpen={setOpen}
            className={cn('relative', className)}
            contentClass="absolute left-0 top-0 mt-10 w-full px-4"
            button={({ onClick }) => (
              <button
                type="button"
                className="bg-gray-f7 flex items-center justify-between px-5 text-xl h-10 rounded-full border border-gray-8b block w-full relative z-30"
                onClick={onClick}
              >
                {value}
                <CaretDown size={24} />
              </button>
            )}
          >
            <div className="bg-gray-f7 border border-gray-8b -mt-px rounded-b">
              {Object.keys(options).map((label) => (
                <div
                  className={cn(
                    'w-full h-10 flex items-center px-4 font-bold transition duration-200 cursor-pointer',
                    value === options[label]
                      ? 'bg-blue-light'
                      : 'hover:bg-gray-e2',
                  )}
                  onClick={() => onChange(options[label])}
                >
                  {label}
                </div>
              ))}
            </div>
          </Dropdown>
        )
      }}
    />
  )
}
