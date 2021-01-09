import React from 'react'
import cn from 'classnames'

type Props = {
  value?: string
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
  onBlur?(e: React.ChangeEvent<HTMLTextAreaElement>): void
  error?: string
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
  elementRef?: React.RefObject<HTMLTextAreaElement>
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

export default function ControlledTextarea({
  value,
  onChange,
  onBlur,
  error,
  name,
  label,
  required,
  className,
  counter,
  maxLength,
  classes = {},
  elementRef,
  ...props
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e)
    const textarea = e.target
    textarea.style.height = ''
    textarea.getBoundingClientRect()
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const style = Object.assign({}, defaultClasses, classes)

  return (
    <div className={cn(style.root, className)}>
      {label && (
        <label className={style.label} htmlFor={name}>
          {label}
          {required && ' *'}
          {counter && (
            <div
              className={cn(
                style.counter,
                (value?.length || 0) > (maxLength || 0) && style.counterError,
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
        className={cn(style.input, error && style?.inputError)}
        {...props}
      />
      {error && <div className={style.error}>{error}</div>}
    </div>
  )
}
