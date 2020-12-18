import React from 'react'
import cn from 'classnames'
import { Controller, UseFormMethods } from 'react-hook-form'

type Props = {
  form: UseFormMethods<Record<string, unknown>>
  name: string
  label?: string
  required?: boolean
  className?: string
  [key: string]: unknown
}

export function Input({
  form,
  name,
  label,
  required,
  className,
  ...props
}: Props) {
  const { errors, control, formState } = form
  const error = errors[name]
  const hasError = error && (formState.isSubmitted || formState.touched[name])

  return (
    <Controller
      control={control}
      name={name}
      render={({ value, name, onChange, onBlur }) => {
        return (
          <div className={cn('w-full', className)}>
            {label && (
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={name}
              >
                {label}
                {required && ' *'}
              </label>
            )}
            <input
              id={name}
              name={name}
              value={value || ''}
              onChange={onChange}
              onBlur={onBlur}
              required={required}
              className={cn('form-input', hasError && 'form-input-error')}
              {...props}
            />
            {hasError && error && (
              <div className="form-error">{error.message}</div>
            )}
          </div>
        )
      }}
    />
  )
}
