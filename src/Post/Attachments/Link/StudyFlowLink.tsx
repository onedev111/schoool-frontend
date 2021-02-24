import React from 'react'
import Link from 'Post/Attachments/Link/index'
import studyFlowIcon from 'assets/images/icons/studyflow.svg'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'

type Props = {
  studyFlow: {
    id: number
    title: string
    username: string
  }
  className?: string
}

export default function StudyFlowLink({ studyFlow, className }: Props) {
  const [showAlert, toggleAlert] = useToggle()

  return (
    <div className="flex flex-col">
      {showAlert && (
        <Alert
          title="Please use mobile application to see the content"
          onClose={toggleAlert}
        />
      )}
      <Link
        onClick={toggleAlert}
        className={className}
        image={
          <img src={studyFlowIcon} style={{ width: '70px', height: '70px' }} />
        }
        title={studyFlow.title}
        text={`Provided by ${studyFlow.username}`}
      />
    </div>
  )
}
