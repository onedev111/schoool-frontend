import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { useCurrentUser } from 'User/currentUser'
import Radio from 'Shared/Form/Radio'
import publicIcon from 'assets/images/icons/public.png'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'

type Props = {
  state: State
}

export default observer(function TagModal({ state }: Props) {
  const [{ avatar }] = useCurrentUser()

  const onClose = () => state.backToForm()

  const options: {
    label: string
    text: string
    image: string
  }[] = [
    {
      label: 'Listen on the go',
      text: 'Class',
      image: publicIcon,
    },
    {
      label: 'Restaurant',
      text: 'StudyFlow',
      image: avatar,
    },
    {
      label: 'Mark Kim',
      text: 'Friend',
      image: avatar,
    },
  ]

  return (
    <>
      <div className="pb-4">
        <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative">
          <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={26} />
            </button>
          </div>
          Tag
        </div>
        <div className="py-3 px-4 relative border-b border-gray-c5">
          <div className="absolute top-0 left-0 bottom-0 flex-center ml-7 text-gray-a4">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            className="bg-gray-ef border border-gray-97 rounded-full h-9 flex items-center pl-8 pr-4 w-full"
            placeholder="Search friends, class, studyflow "
          />
        </div>
        {options.map(({ label, text, image }, i) => {
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
                checked={false}
                onChange={() => {
                  console.log('select')
                }}
                name={name}
                value={label}
              />
            </label>
          )
        })}
      </div>
    </>
  )
})
