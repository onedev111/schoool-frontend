import React from 'react'
import Sidebar from 'Shared/Sidebar'
import { User } from 'User/types'
import Spin from 'assets/images/icons/Spin'
import { useQuery } from 'react-query'
import api from 'api'
import ClassItem from 'Class/Sidebar/ClassesList/Item'
import { Link } from 'react-router-dom'
import routes from 'routes'
import FollowersModal from 'User/Page/FollowersModal'

type Props = {
  isMe: boolean
  userId: number
  user?: User
  isLoading: boolean
}

export default function UserSidebar({ isMe, userId, user, isLoading }: Props) {
  const [showFollowersTab, setFollowersTab] = React.useState<
    'following' | 'followers' | undefined
  >()

  const { data: classes, isLoading: isLoadingClasses } = useQuery(
    ['class', { userId }],
    () => api.classes.list({ userId }),
    {
      enabled: !isMe,
    },
  )

  const { data: followings, isLoading: isLoadingFollowings } = useQuery(
    ['user', userId, 'following'],
    () => api.user.getWhoUserIsFollowing({ userId }),
    {
      enabled: isMe,
    },
  )

  return (
    <Sidebar className="mr-5">
      {showFollowersTab && user && (
        <FollowersModal
          isMe={isMe}
          user={user}
          onClose={() => setFollowersTab(undefined)}
          setTab={setFollowersTab}
          tab={showFollowersTab}
          followings={followings}
          isLoadingFollowings={isLoadingFollowings}
          useFollowings={isMe}
        />
      )}
      <div className="py-10 px-6 bg-white shadow">
        {isLoading && (
          <div className="flex-center">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isLoading && user && (
          <>
            <div
              className="rounded-full mx-auto bg-center bg-cover"
              style={{
                width: '220px',
                height: '220px',
                backgroundImage: `url("${user.avatar}")`,
              }}
            />
            <div className="mt-3 text-center text-xl">{user.name}</div>
            <div className="mt-8 uppercase text-xl">Intro</div>
            <div className="mt-1 text-gray-6b">{user.language}</div>
            <div className="mt-1 text-gray-6b">{user.location}</div>
            <div className="mt-1 text-gray-6b">
              Following{' '}
              <button
                type="button"
                className="text-blue-primary"
                onClick={() => setFollowersTab('following')}
              >
                {user.followingCount}
              </button>{' '}
              followed by{' '}
              <button
                type="button"
                className="text-blue-primary"
                onClick={() => setFollowersTab('followers')}
              >
                {user.followersCount}
              </button>
            </div>
            <div className="mt-1 text-gray-6b">
              Became a schoooler on {user.createdAt.format('MMM DD, YYYY')}
            </div>
          </>
        )}
        {(isLoadingClasses || (isLoadingFollowings && isMe)) && !isLoading && (
          <div className="flex-center">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isMe && !isLoadingClasses && classes && (
          <>
            <div className="mt-10 text-xl uppercase mb-3">Classes</div>
            {classes.owning.map((item) => (
              <ClassItem key={item.id} item={item} />
            ))}
          </>
        )}
        {isMe && !isLoadingFollowings && followings && (
          <>
            <div className="mt-10 text-xl uppercase mb-3 flex justify-between">
              Friends
              <button
                type="button"
                className="text-lg text-blue-primary"
                onClick={() => setFollowersTab('following')}
              >
                See all
              </button>
            </div>
            <div
              className="grid grid-cols-3 items-baseline"
              style={{ columnGap: '2rem' }}
            >
              {followings.map((user) => (
                <Link
                  key={user.id}
                  to={routes.user(user.id)}
                  className="flex-center flex-col mb-4"
                >
                  <div
                    className="rounded-full bg-center bg-cover"
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundImage: `url("${user.avatar}")`,
                    }}
                  />
                  <div className="mt-1 text-center">{user.name}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Sidebar>
  )
}
