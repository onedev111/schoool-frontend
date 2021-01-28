import React from 'react'
import Alert from 'Shared/Modal/Alert'
import useToggle from 'utils/useToggle'
import { useMutation } from 'react-query'
import api from 'api'
import { Post } from 'Post/types'
import Spin from 'assets/images/icons/Spin'

type Props = {
  className?: string
  post: Post
}

export default function Report({ className, post }: Props) {
  const [openAlert, toggleAlert] = useToggle()

  const { mutate: report, isLoading } = useMutation(api.post.report, {
    onSuccess: toggleAlert,
  })

  return (
    <>
      {openAlert && (
        <Alert title="Your report is successfully sent" onClose={toggleAlert} />
      )}
      <button
        type="button"
        disabled={isLoading}
        className={className}
        onClick={() => report({ postId: post.id })}
      >
        {isLoading && (
          <div className="w-0 h-full flex-center relative">
            <Spin className="w-5 h-5 text-blue-primary animate-spin absolute right-0 mr-2" />
          </div>
        )}
        Report
      </button>
    </>
  )
}
