import React from 'react'
import Input from 'Shared/Form/Input'
import { UseFormMethods } from 'react-hook-form'

interface Props {
  form: UseFormMethods<Record<string, unknown>>
  name: string
  label?: string
  placeholder?: string
  className?: string
  type?: string
}

export default function AuthInput({
  form,
  name,
  label,
  className,
  ...props
}: Props) {
  return (
    <Input
      form={form}
      name={name}
      label={label}
      classes={{
        root: className,
        input: 'px-4 h-10 w-full bg-gray-f5 border border-gray-8b rounded',
        error: 'text-red-500 text-center',
      }}
      {...props}
    />
  )
}
