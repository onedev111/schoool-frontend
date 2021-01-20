import React from 'react'
import { useParams } from 'react-router-dom'
import ClassLayout from 'Class/Layout'
import logo from 'assets/images/logo.svg'
import { Link } from 'react-router-dom'
import Posts from 'Class/Posts'
import { useMutation, useQuery } from 'react-query'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import routes from 'routes'
import JoinedClassActions from 'Class/Page/JoinedClassActions'
import ClassActions from 'Class/Page/ClassActions'

export default function ClassPage() {
  const { id: stringId } = useParams<{ id: string }>()
  const id = parseInt(stringId)

  const { data: item, isLoading } = useQuery(['class', id], () =>
    api.classes.getClass({ id }),
  )

  const [getUser, { data: user }] = useMutation(api.user.getUser)

  React.useEffect(() => {
    if (item) {
      getUser({ id: item.owner.id })
    }
  }, [item])

  return (
    <ClassLayout>
      <div className="bg-white shadow mb-5 pt-16">
        {isLoading && (
          <div className="flex-center pb-16">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isLoading && item && (
          <>
            <div className="px-16">
              <div className="flex-center mb-4">
                <Link to={routes.user(item.owner.id)}>
                  <img
                    src={user ? user.avatar : logo}
                    alt="logo"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                </Link>
                <img
                  className="mx-10 rounded-full flex-shrink-0 block"
                  src={item.image}
                  alt="class photo"
                  style={{
                    width: '240px',
                    height: '240px',
                  }}
                />
                <div style={{ width: '100px' }}>
                  <div className="border border-black rounded-full flex-center h-6 text-sm text-black w-full">
                    {item.isPublic ? 'Public' : 'Private'}
                  </div>
                  {item.isLocked && (
                    <div className="border border-red-50 text-red-50 rounded-full flex-center h-6 text-sm w-full mt-2">
                      Join Blocked
                    </div>
                  )}
                  {item.completed && (
                    <div className="border border-blue-0089c0 text-blue-0089c0 rounded-full flex-center h-6 text-sm w-full mt-2">
                      Completed
                    </div>
                  )}
                </div>
              </div>
              <div
                className="text-3xl font-bold text-black flex-center"
                style={{ height: '38px' }}
              >
                {item.name}
              </div>
              <Link
                to={routes.user(item.owner.id)}
                className="text-blue-primary text-lg flex-center h-6 mb-4 hover:underline"
              >
                Created by {item.owner.name}
              </Link>
              <div className="text-black text-lg mb-4">{item.description}</div>
            </div>
            {(item.isOwn || item.isJoined) && (
              <JoinedClassActions item={item} />
            )}
            {!(item.isJoined || item.isJoined) && <ClassActions item={item} />}
          </>
        )}
      </div>
      <Posts />
    </ClassLayout>
  )
}
