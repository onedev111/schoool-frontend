import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { useCurrentUser } from 'User/currentUser'
import Radio from 'Shared/Form/Radio'
import { UseFormMethods, Controller } from 'react-hook-form'
import publicIcon from 'assets/images/icons/public.png'
import useToggle from 'Shared/useToggle'
import Alert from 'Shared/Modal/Alert'

type Props = {
  form: UseFormMethods<any>
  onClose(): void
}

export default function SelectTarget({ form, onClose }: Props) {
  const [{ avatar }] = useCurrentUser()
  const [showNotice, toggleNotice] = useToggle()

  const options: {
    label: string
    text: string
    image: string
    notice?: boolean
  }[] = [
    {
      label: 'Public',
      text: 'Anyone can see this post.',
      image: publicIcon,
    },
    {
      label: 'Only for me',
      text: 'Only you can see this post.',
      image: avatar,
    },
    {
      label: 'Let’s Study English',
      text: 'Only this class memebers can see this post.',
      image: avatar,
      notice: true,
    },
  ]

  return (
    <>
      {showNotice && (
        <Alert
          title="Notice"
          text="Private class cannot be selected with other public classes."
          onClose={toggleNotice}
        />
      )}
      <div className="pb-4">
        <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
          <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={26} />
            </button>
          </div>
          Select Target
        </div>
        <Controller
          control={form.control}
          name="privacy"
          render={({ value: selected, name, onChange }) => {
            return (
              <>
                {options.map(({ label, text, image, notice }, i) => {
                  const checked = label === selected

                  return (
                    <label
                      key={i}
                      className="block border-b border-gray-c5 flex items-center justify-between py-2 px-4 pr-7"
                    >
                      <div className="flex-center">
                        <img
                          src={image}
                          alt="image"
                          style={{ width: '45px', height: '45px' }}
                          className="rounded-full"
                        />
                        <div className="ml-3 flex flex-col justify-center">
                          <div className="text-lg font-bold">{label}</div>
                          <div className="text-gray-6b text-sm">{text}</div>
                        </div>
                      </div>
                      <Radio
                        size={22}
                        checked={checked}
                        onChange={(e: any) => {
                          onChange(e)
                          if (notice) toggleNotice()
                        }}
                        name={name}
                        value={label}
                      />
                    </label>
                  )
                })}
              </>
            )
          }}
        />
        <div
          className="pt-8 pb-4 text-gray-6b text-center w-full mx-auto"
          style={{ width: '400px' }}
        >
          You have no target class as you haven’t created or joined any class
          yet.
        </div>
      </div>
    </>
  )
}
