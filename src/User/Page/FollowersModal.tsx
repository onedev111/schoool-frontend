import React from 'react'
import Modal from 'Shared/Modal'
import Tabs from 'Shared/Tabs'
import { useMutation, useQuery } from 'react-query'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import { UserToFollow } from 'User/types'
import Follower from 'User/Page/Follower'
import useVirtualList from 'utils/useVirtualList'

type Tab = 'following' | 'followers'

type Props = {
  isMe: boolean
  user: { id: number; name: string }
  tab: Tab
  followings?: UserToFollow[]
  isLoadingFollowings: boolean
  useFollowings: boolean
  setTab(tab: Tab): void
  onClose(): void
}

export default function FollowersModal({
  isMe,
  user,
  tab,
  followings: providedFollowings,
  isLoadingFollowings: providedIsLoadingFollowings,
  useFollowings,
  setTab,
  onClose,
}: Props) {
  const {
    data: localFollowings,
    isLoading: localIsLoadingFollowings,
  } = useQuery(
    ['user', user.id, 'following'],
    () => api.user.getWhoUserIsFollowing({ userId: user.id }),
    {
      enabled: tab === 'following',
    },
  )

  const followings = useFollowings ? providedFollowings : localFollowings
  const isLoadingFollowings = useFollowings
    ? providedIsLoadingFollowings
    : localIsLoadingFollowings

  const { data: followers, isLoading: isLoadingFollowers } = useQuery(
    ['user', user.id, 'followers'],
    () => api.user.getWhoIsFollowingUser({ userId: user.id }),
    {
      enabled: tab === 'followers',
    },
  )

  const isLoading = isLoadingFollowings || isLoadingFollowers
  const users = followings || followers
  const usersCount = users?.length

  const [unfollowUser, setUnfollowUser] = React.useState<UserToFollow>()
  const [followLoadingIds, setFollowLoadingIds] = React.useState<number[]>([])
  const [unfollowLoadingIds, setUnollowLoadingIds] = React.useState<number[]>(
    [],
  )

  const { mutate: follow } = useMutation(
    ({ user: userToFollow }: { user: UserToFollow }) => {
      setFollowLoadingIds((ids) => [...ids, userToFollow.id])
      return api.user.follow({ user: userToFollow, updateCacheUserId: user.id })
    },
    {
      onSettled(_, error, { user }) {
        setFollowLoadingIds((ids) => ids.filter((id) => id !== user.id))
      },
    },
  )

  const { mutate: unfollow } = useMutation(
    ({ user: userToUnfollow }: { user: UserToFollow }) => {
      setUnollowLoadingIds((ids) => [...ids, userToUnfollow.id])
      return api.user.unfollow({
        user: userToUnfollow,
        updateCacheUserId: user.id,
      })
    },
    {
      onSettled(_, error, { user }) {
        if (unfollowUser?.id === user.id) setUnfollowUser(undefined)

        setUnollowLoadingIds((ids) => ids.filter((id) => id !== user.id))
      },
    },
  )

  const isUnfollowingSelected =
    unfollowUser && unfollowLoadingIds.includes(unfollowUser.id)

  const list = useVirtualList({
    items: users,
    rowHeight: 61,
  })

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 py-10"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
      onClick={onClose}
    >
      {unfollowUser && (
        <Modal
          onClose={() => setUnfollowUser(undefined)}
          className="text-center"
        >
          <div className="mt-8 mb-6 text-xl font-bold">Unfollow user?</div>
          <hr className="text-gray-bb" />
          <div className="flex-center my-5">
            <button
              className="text-gray-4f h-7 font-bold w-24"
              onClick={() => setUnfollowUser(undefined)}
            >
              No
            </button>
            <button
              className="rounded-full bg-red-58 text-white h-7 font-bold ml-3 flex-center w-24"
              onClick={() => unfollow({ user: unfollowUser })}
              disabled={isUnfollowingSelected}
            >
              {isUnfollowingSelected && (
                <Spin className="w-5 h-5 text-white animate-spin mr-2" />
              )}
              Yes
            </button>
          </div>
        </Modal>
      )}
      <div
        className="bg-white shadow w-full mx-auto h-full flex flex-col"
        style={{ maxWidth: '550px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Tabs
          className="rounded-tl rounded-tr"
          tabs={[
            {
              label: isMe ? "I'm following" : `${name} is following`,
              value: 'following',
              onClick: () => setTab('following'),
            },
            {
              label: isMe ? 'Who follows me' : `Who follows ${name}`,
              value: 'followers',
              onClick: () => setTab('followers'),
            },
          ]}
          activeTab={tab}
        />
        {isLoading && (
          <div className="flex-center py-5">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isLoading &&
          users &&
          list.render((user) => (
            <Follower
              user={user}
              followLoadingIds={followLoadingIds}
              unfollowLoadingIds={unfollowLoadingIds}
              setUnfollowUser={setUnfollowUser}
              follow={follow}
            />
          ))}
      </div>
    </div>
  )
}
