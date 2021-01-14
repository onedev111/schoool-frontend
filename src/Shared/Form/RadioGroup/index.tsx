import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'
import Radio from 'Shared/Form/Radio'

export default function RadioGroup({
  form,
  name,
  values,
  classes = {},
  onChange: controlChange,
}: {
  // eslint-disable-next-line
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
  onChange?(value: string, setValue: (value: string) => void): void
}) {
  const { errors, control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ value: currentValue, name, onChange }) => {
        const error = errors[name]

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (controlChange) controlChange(e.target.value, onChange)
          else onChange(e)
        }

        return (
          <>
            <div className={classes.group}>
              {Object.keys(values).map((value) => (
                <Radio
                  key={value}
                  checked={currentValue === value}
                  onChange={handleChange}
                  classes={classes}
                  name={name}
                  label={values[value]}
                  value={value}
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
