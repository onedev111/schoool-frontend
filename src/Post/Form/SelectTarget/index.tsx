import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { useCurrentUser } from 'User/currentUser'
import Radio from 'Shared/Form/Radio'
import publicIcon from 'assets/images/icons/public.png'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

export default observer(function SelectTarget({ state }: Props) {
  const [{ avatar }] = useCurrentUser()
  const [showNotice, toggleNotice] = useToggle()

  const onClose = () => state.backToForm()

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
        {options.map(({ label, text, image, notice }, i) => {
          const checked = label === state.values.privacy

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
                  state.setPrivacy(e.target.value)
                  if (notice) toggleNotice()
                }}
                name={name}
                value={label}
              />
            </label>
          )
        })}
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
})
