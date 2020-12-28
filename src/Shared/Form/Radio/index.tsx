import React from 'react'
import cn from 'classnames'

type Props = {
  checked: boolean
  onChange(): void
  name: string
  value: string
  label?: string
  classes?: {
    root?: string
    label?: string
    input?: string
  }
}

export default function Radio({
  checked,
  onChange,
  name,
  value,
  label,
  classes = {},
}: Props) {
  return (
    <label className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div
        className={cn(
          'w-4 h-4 rounded-full border border-black overflow-hidden',
          classes.input,
        )}
        style={{ padding: '1px' }}
      >
        <input
          type="radio"
          value={value}
          name={name}
          checked={checked}
          onChange={onChange}
          hidden
        />
        <div
          className={cn(
            'w-full h-full rounded-full bg-blue-primary transition duration-200',
            !checked && 'opacity-0',
          )}
        />
      </div>
    </label>
  )
}
