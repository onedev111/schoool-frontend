import React from 'react'
import Dropdown from 'Shared/Dropdown'
import useToggle from 'Shared/useToggle'
import SavePostModal from 'Home/Post/Menu/SavePostModal'
import SendToNotebook from 'Home/Post/Menu/SendToNotebook'
import { Post } from 'Home/Post/types'

const itemClass =
  'w-full h-16 flex-center font-bold transition duration-200 hover:bg-gray-f2 cursor-pointer'

type Props = {
  post: Post
  button: (params: { onClick(): void }) => React.ReactNode
  notebookMenu?: boolean
  className?: string
}

export default function Menu({ post, button, notebookMenu, className }: Props) {
  const [savePostOpen, toggleSavePost] = useToggle()
  const [sendToNotebookOpen, toggleSendToNotebook] = useToggle()

  return (
    <Dropdown
      button={button}
      className={className}
      contentClass="absolute mt-2 rounded-lg shadow-around bg-white right-0 z-20"
    >
      {!notebookMenu && <div className={`${itemClass}`}>Send Message</div>}
      {!notebookMenu && (
        <div className={`${itemClass} text-blue-deep`}>Follow</div>
      )}
      {notebookMenu && (
        <>
          {sendToNotebookOpen && (
            <SendToNotebook post={post} onClose={toggleSendToNotebook} />
          )}
          <div onClick={toggleSendToNotebook} className={`${itemClass}`}>
            Send To Study Notes
          </div>
        </>
      )}

      {savePostOpen && <SavePostModal onClose={toggleSavePost} />}
      <div onClick={toggleSavePost} className={`${itemClass} text-blue-deep`}>
        Save Post
      </div>

      {!notebookMenu && <div className={`${itemClass}`}>Share This Post</div>}
      {!notebookMenu && (
        <div className={`${itemClass} text-blue-deep`}>Report</div>
      )}
      {notebookMenu && (
        <div className={`${itemClass} text-blue-deep`}>Edit</div>
      )}
      <div className={`${itemClass} text-red-500`}>Delete</div>
      {notebookMenu && <div className={`${itemClass}`}>Share This Post</div>}
    </Dropdown>
  )
}
