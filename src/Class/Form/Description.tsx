import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'

type Props = {
  form: Partial<UseFormMethods>
  maxLength: number
}

export default function Description({ form, maxLength }: Props) {
  return (
    <Controller
      control={form.control}
      name="description"
      render={({ value, onChange, onBlur }) => {
        return (
          <>
            <div className="absolute top-0 right-0 -mt-6 text-sm mr-2">
              {value.length} / {maxLength}
            </div>
            <textarea
              name="description"
              rows={3}
              className="rounded border border-gray-8b placeholder-gray-6b px-4 py-2 w-full"
              placeholder="Enter your class name"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </>
        )
      }}
    />
  )
}
