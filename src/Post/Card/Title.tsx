import React from 'react'
import { Post } from 'Post/types'
import { Link } from 'react-router-dom'
import routes from 'routes'
import { observer } from 'mobx-react-lite'

type Props = {
  post: Post
}

export default observer(function PostTitle({
  post: { user, sLecture, isPublic, classes },
}: Props) {
  const onlyForMe = sLecture
    ? ' posted an S-Lecture Only for me '
    : ' Only for me'
  const postedTo = sLecture ? ' posted an S-Lecture to ' : ' posted to '

  return (
    <div className="text-xl text-gray-02">
      <Link to={routes.user(user.id)} className="font-bold">
        {user.name}
      </Link>
      {!isPublic && classes.length === 0 && onlyForMe}
      {(isPublic || classes.length > 0) && postedTo}
      {isPublic && <span className="font-bold">Public</span>}
      {isPublic && classes.length > 0 && ', '}
      {classes.length > 0 &&
        classes.map(({ id, name }, index) => (
          <React.Fragment key={id}>
            {index !== 0 && ', '}
            <Link to={routes.class(id)} className="font-bold">
              {name}
            </Link>
          </React.Fragment>
        ))}
    </div>
  )
})
