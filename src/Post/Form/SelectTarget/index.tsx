import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { getCurrentUser } from 'User/currentUser'
import publicIcon from 'assets/images/icons/public.png'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import SelectTargetOption from 'Post/Form/SelectTarget/Option'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import { Class } from 'Class/types'

type Props = {
  state: State
}

export default observer(function SelectTarget({ state }: Props) {
  const currentUser = getCurrentUser()
  const [showNotice, toggleNotice] = useToggle()
  const { data, isLoading } = useQuery('classes', api.classes.list)

  const joined = data?.joined || []
  const owning = data?.owning || []
  const classes = [...joined, ...owning]
  const selectedClasses = state.values.classes

  const onClose = () => state.backToForm()

  const toggleClass = (item: Class, add: boolean) => {
    if (!add)
      return state.setClasses(
        selectedClasses.filter(({ id }) => id !== item.id),
      )

    let newClasses = [...selectedClasses, { id: item.id, name: item.name }]

    const { isPublic } = item
    const otherPublicFilter = (isPublic: boolean) => ({ id }: { id: number }) =>
      classes.find((item) => item.id === id && item.isPublic === isPublic)

    if (newClasses.some(otherPublicFilter(!isPublic))) {
      toggleNotice()
      newClasses = newClasses.filter(otherPublicFilter(isPublic))
    }

    state.setClasses(newClasses)
  }

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
        {currentUser.isInstructor && (
          <SelectTargetOption
            image={publicIcon}
            title="Public"
            text="Anyone can see this post."
            checked={state.values.isPublic}
            onChange={() => {
              state.setIsPublic(!state.values.isPublic)
            }}
          />
        )}
        <SelectTargetOption
          image={currentUser.avatar}
          title="Only for me"
          text="Only you can see this post."
          checked={!state.values.isPublic && selectedClasses.length === 0}
          onChange={() => {
            state.setIsPublic(false)
            state.setClasses([])
          }}
        />
        {isLoading && (
          <div className="flex-center my-5">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {classes.map((item) => {
          const checked = selectedClasses.some(({ id }) => id === item.id)

          return (
            <SelectTargetOption
              key={item.id}
              image={item.image}
              title={item.name}
              text="Only this class memebers can see this post."
              checked={checked}
              onChange={() => toggleClass(item, !checked)}
            />
          )
        })}
        {!isLoading && data?.joined.length === 0 && data?.owning.length === 0 && (
          <div
            className="pt-8 pb-4 text-gray-6b text-center w-full mx-auto"
            style={{ width: '400px' }}
          >
            You have no target class as you haven’t created or joined any class
            yet.
          </div>
        )}
      </div>
    </>
  )
})
