import React from 'react'
import cn from 'classnames'

type Props = {
  checked: boolean
  onChange?(checked: boolean): void
  className?: string
}

export default function CircleCheckbox({
  checked,
  onChange,
  className,
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        'w-4 h-4 rounded-full border border-black overflow-hidden',
        className,
      )}
      onClick={() => onChange && onChange(!checked)}
      style={{ padding: '2px' }}
    >
      <div
        className={cn(
          'w-full h-full rounded-full bg-blue-primary transition duration-200',
          !checked && 'opacity-0',
        )}
      />
    </button>
  )
}
