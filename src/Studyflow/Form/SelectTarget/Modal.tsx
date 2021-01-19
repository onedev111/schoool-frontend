import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import { getCurrentUser } from 'User/currentUser'
import publicIcon from 'assets/images/icons/public.png'
import { observer } from 'mobx-react-lite'
import { useQuery } from 'react-query'
import SelectTargetOption from 'Post/Form/SelectTarget/Option'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import Radio from 'Shared/Form/Radio'
import Modal from 'Shared/Modal'

type Props = {
  isPublic: boolean
  userIds: number[]
  setUserIds(ids: number[]): void
  setIsPublic(value: boolean): void
  onClose(): void
}

export default observer(function SelectTargetModal({
  isPublic,
  userIds,
  setUserIds,
  setIsPublic,
  onClose,
}: Props) {
  const currentUser = getCurrentUser()
  const {
    data: users,
    isLoading,
  } = useQuery('studyFlow.searchFriendsToShareWith', () =>
    api.studyFlow.searchFriendsToShareWith(),
  )

  return (
    <Modal width={550} className="relative" onClose={onClose}>
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
            text="Anyone can see this study flow."
            checked={isPublic && userIds.length === 0}
            onChange={() => {
              setIsPublic(true)
              setUserIds([])
            }}
          />
        )}
        <SelectTargetOption
          image={currentUser.avatar}
          title="Only for me"
          text="Only you can see this post."
          checked={!isPublic && userIds.length === 0}
          onChange={() => {
            setIsPublic(false)
            setUserIds([])
          }}
        />
        {isLoading && (
          <div className="flex-center my-5">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {users?.map((user) => {
          const checked = userIds.includes(user.id)

          return (
            <label
              key={user.id}
              className="block border-b border-gray-c5 flex items-center justify-between py-2 px-4 pr-7"
            >
              <div className="flex-center">
                <img
                  src={user.avatar}
                  alt="avatar"
                  style={{ width: '45px', height: '45px' }}
                  className="rounded-full"
                />
                <div className="ml-3 flex flex-col justify-center">
                  <div className="text-lg font-bold">{user.name}</div>
                </div>
              </div>
              <Radio
                type="checkbox"
                size={22}
                checked={checked}
                onChange={() => {
                  setIsPublic(false)
                  if (checked)
                    setUserIds(userIds.filter((id) => id !== user.id))
                  else setUserIds([...userIds, user.id])
                }}
                name={name}
                value={String(user.id)}
              />
            </label>
          )
        })}
        {!isLoading && users?.length === 0 && (
          <div
            className="pt-8 pb-4 text-gray-6b text-center w-full mx-auto"
            style={{ width: '400px' }}
          >
            You have no users to share the study flow with yet.
          </div>
        )}
      </div>
    </Modal>
  )
})
