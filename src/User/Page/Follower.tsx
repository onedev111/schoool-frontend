import React from 'react'
import Spin from 'assets/images/icons/Spin'
import { UserToFollow } from 'User/types'

type Props = {
  user: UserToFollow
  followLoadingIds: number[]
  unfollowLoadingIds: number[]
  setUnfollowUser(user: UserToFollow): void
  follow(params: { user: UserToFollow }): void
}

export default function Follower({
  user,
  followLoadingIds,
  unfollowLoadingIds,
  setUnfollowUser,
  follow,
}: Props) {
  const isFollowLoading = followLoadingIds.includes(user.id)
  const isUnfollowLoading = unfollowLoadingIds.includes(user.id)

  return (
    <div className="flex items-center py-2 pl-5 pr-4">
      <div
        className="rounded-full bg-center bg-cover"
        style={{
          width: '45px',
          height: '45px',
          backgroundImage: `url("${user.avatar}")`,
        }}
      />
      <div className="flex-grow ml-3 font-bold text-black text-lg">
        {user.name}
      </div>
      {user.isFollowing && (
        <button
          type="button"
          className="rounded-full flex-center border border-gray-97 text-gray-97 text-sm font-bold h-8 px-2"
          style={{
            width: '90px',
          }}
          onClick={() => setUnfollowUser(user)}
          disabled={isUnfollowLoading}
        >
          Following
        </button>
      )}
      {!user.isFollowing && (
        <button
          type="button"
          className="rounded-full flex-center bg-blue-primary text-white text-sm font-bold h-8 px-2"
          style={{
            width: '90px',
          }}
          onClick={() => follow({ user })}
          disabled={isFollowLoading}
        >
          {isFollowLoading && (
            <Spin className="w-5 h-5 text-white animate-spin mr-2" />
          )}
          Follow
        </button>
      )}
    </div>
  )
}
