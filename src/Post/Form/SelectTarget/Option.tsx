import React from 'react'
import Radio from 'Shared/Form/Radio'

type Props = {
  image: string
  title: string
  text: string
  checked: boolean
  onChange(checked: boolean): void
}

export default function SelectTargetOption({
  image,
  title,
  text,
  checked,
  onChange,
}: Props) {
  return (
    <label className="block border-b border-gray-c5 flex items-center justify-between py-2 px-4 pr-7">
      <div className="flex-center">
        <img
          src={image}
          alt="image"
          style={{ width: '45px', height: '45px' }}
          className="rounded-full"
        />
        <div className="ml-3 flex flex-col justify-center">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-gray-6b text-sm">{text}</div>
        </div>
      </div>
      <Radio
        type="checkbox"
        size={22}
        checked={checked}
        onChange={() => onChange(!checked)}
        name={name}
        value={title}
      />
    </label>
  )
}
