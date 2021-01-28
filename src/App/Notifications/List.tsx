import React from 'react'
import { useQuery } from 'react-query'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { Notification } from 'App/Notifications/types'
import Modal from 'Shared/Modal'
import Post from 'Post/Item'
import history from 'utils/history'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'

const dontPrependName: Record<number, boolean> = {
  18: true,
}

// TODO: notifications

const shouldOpenPost = ({ type }: Notification) =>
  type < 6 || type === 7 || type === 9 || type === 23

const openClassTypes = [33, 34, 12, 14, 19, 18, 13]
const shouldOpenClass = ({ type }: Notification) =>
  openClassTypes.includes(type)

const openClassHomeTypes = [15, 16, 17]
const shouldOpenClassHome = ({ type }: Notification) =>
  openClassHomeTypes.includes(type)

const shouldOpenUser = ({ type }: Notification) => type === 21

const notificationNotSupportedMessage =
  'Please use Schoool mobile app to open this notification'

export default function NotificationsList() {
  const [openNotifications, setNotifications] = React.useState(false)
  const [showAlert, toggleAlert] = useToggle()
  const { data, isLoading } = useQuery(
    'notifications',
    api.notifications.list,
    {
      enabled: openNotifications,
    },
  )

  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('.js-notifications')) setNotifications(false)
    }

    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [])

  const [postId, setPostId] = React.useState<number>()
  const [commentId, setCommentId] = React.useState<number>()
  const { data: post } = useQuery(
    ['post', postId],
    () =>
      postId ? api.post.findById({ id: postId }) : Promise.resolve(undefined),
    {
      enabled: Boolean(postId),
    },
  )

  const handleClick = React.useCallback((item: Notification) => {
    if (shouldOpenPost(item)) {
      const { entityId, commentId } = item
      setPostId(entityId)
      setCommentId(commentId)
      setNotifications(false)
    } else if (shouldOpenClass(item)) {
      const { entityId } = item
      if (entityId) history.push(routes.class(entityId))
      setNotifications(false)
    } else if (shouldOpenClassHome(item)) {
      history.push(routes.classes())
      setNotifications(false)
    } else if (shouldOpenUser(item)) {
      const { entityId } = item
      if (entityId) history.push(routes.user(entityId))
      setNotifications(false)
    } else {
      toggleAlert()
    }
  }, [])

  return (
    <>
      {showAlert && (
        <Alert title={notificationNotSupportedMessage} onClose={toggleAlert} />
      )}
      {postId && post && (
        <Modal
          onClose={() => {
            setPostId(undefined)
            setCommentId(undefined)
          }}
        >
          <Post
            post={post}
            className="mb-0 rounded"
            highlightedCommentId={commentId}
          />
        </Modal>
      )}
      <button
        type="button"
        className={cn(
          'text-xl ml-4 js-notifications',
          openNotifications && 'text-blue-primary',
        )}
        onClick={() => setNotifications(!openNotifications)}
      >
        Notifications
      </button>
      {openNotifications && (
        <div
          className="absolute z-40 left-0 bg-white shadow mt-1 border border-gray-c5 overflow-auto js-notifications font-normal"
          style={{
            top: '100%',
            width: '421px',
            maxHeight: 'calc(100vh - 130px)',
          }}
        >
          <div className="text-center font-bold text-2xl mt-8 mb-6">
            Notifications
          </div>
          {isLoading && (
            <div className="flex-center py-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
          {!isLoading &&
            data?.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center py-2 px-4 border-b border-gray-c5',
                  i === 0 && 'border-t',
                )}
              >
                <div
                  className="rounded-full flex-shrink-0 bg-center bg-cover"
                  style={{
                    width: '45px',
                    height: '45px',
                    backgroundImage: `url("${item.image}")`,
                  }}
                />
                <button
                  type="button"
                  className="ml-3 text-left"
                  onClick={() => handleClick(item)}
                >
                  {!dontPrependName[item.type] && (
                    <>
                      <Link to={routes.user(item.userId)} className="font-bold">
                        {item.name}
                      </Link>{' '}
                    </>
                  )}
                  {item.message}
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  )
}
