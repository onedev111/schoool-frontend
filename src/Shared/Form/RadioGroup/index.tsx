import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'
import Radio from 'Shared/Form/Radio'

type Props = {
  form: UseFormMethods<any>
  name: string
  values: Record<string, string>
  classes?: {
    group?: string
    root?: string
    label?: string
    input?: string
    error?: string
  }
}

export default function RadioGroup({
  form,
  name,
  values,
  classes = {},
}: Props) {
  const { errors, control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ value, name, onChange }) => {
        const error = errors[name]

        return (
          <>
            <div className={classes.group}>
              {Object.keys(values).map((label) => (
                <Radio
                  key={label}
                  checked={value === values[label]}
                  onChange={onChange}
                  classes={classes}
                  name={name}
                  label={label}
                  value={values[label]}
                />
              ))}
            </div>
            {error && <div className={classes.error}>{error.message}</div>}
          </>
        )
      }}
    />
  )
}
