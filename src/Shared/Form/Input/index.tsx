import React from 'react'
import cn from 'classnames'
import { Controller, UseFormMethods } from 'react-hook-form'

type Props = {
  form: UseFormMethods<any>
  name: string
  label?: string
  required?: boolean
  classes?: {
    root?: string
    label?: string
    input?: string
    inputError?: string
    error?: string
  }
  [key: string]: unknown
}

export default function Input({
  form,
  name,
  label,
  required,
  classes = {},
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
          <div className={classes.root}>
            {label && (
              <label className={classes.label} htmlFor={name}>
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
              className={cn(classes.input, hasError && classes.inputError)}
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
