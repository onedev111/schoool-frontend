import React from 'react'
import cn from 'classnames'
import { Controller, UseFormMethods } from 'react-hook-form'

type Props = {
  form: UseFormMethods<any>
  name: string
  label?: string
  required?: boolean
  className?: string
  counter?: boolean
  maxLength?: number
  classes?: {
    root?: string
    label?: string
    counter?: string
    counterError?: string
    input?: string
    inputError?: string
    error?: string
  }
  elementRef?: React.MutableRefObject<null>
  errorOnlyForSubmitted?: boolean
  [key: string]: unknown
}

const defaultClasses = {
  label:
    'h-6 text-sm text-gray-6b flex items-center justify-between uppercase text-17 mb-1',
  counterError: 'text-red-500',
  input: 'resize-none bg-gray-ef placeholder-gray-97 py-2 px-3 w-full rounded',
  error: 'text-left text-red-500',
}

export default function Textarea({
  form,
  name,
  label,
  required,
  className,
  counter,
  maxLength,
  classes = defaultClasses,
  elementRef,
  errorOnlyForSubmitted,
  ...props
}: Props) {
  const { errors, control, formState } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ value, name, onChange, onBlur }) => {
        const error = errors[name]
        const hasError =
          error &&
          (formState.isSubmitted ||
            (!errorOnlyForSubmitted && formState.touched[name]))

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChange(e)
          const textarea = e.target
          textarea.style.height = ''
          textarea.getBoundingClientRect()
          textarea.style.height = `${textarea.scrollHeight}px`
        }

        return (
          <div className={cn(classes.root, className)}>
            {label && (
              <label className={classes.label} htmlFor={name}>
                {label}
                {required && ' *'}
                {counter && (
                  <div
                    className={cn(
                      classes.counter,
                      (value?.length || 0) > (maxLength || 0) &&
                        classes.counterError,
                    )}
                  >
                    {value?.length || 0}/{maxLength}
                  </div>
                )}
              </label>
            )}
            <textarea
              ref={elementRef}
              id={name}
              name={name}
              value={value || ''}
              onChange={handleChange}
              onBlur={onBlur}
              required={required}
              className={cn(classes.input, hasError && classes?.inputError)}
              {...props}
            />
            {hasError && error && (
              <div className={classes.error}>{error.message}</div>
            )}
          </div>
        )
      }}
    />
  )
}
