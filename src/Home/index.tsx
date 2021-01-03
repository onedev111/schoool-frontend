import React from 'react'
import PostForm from '../Post/Form'
import Post from '../Post'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import Notebook from './Notebook'
import { Post as PostType } from '../Post/types'
import { useQuery } from 'react-query'
import api from 'api'
import UploadingPostsStore from 'Post/UploadingPostsStore'
import { observer } from 'mobx-react-lite'
import Spin from 'assets/images/icons/Spin'
// import dayjs from 'dayjs'

// const text =
//   'This is where post comment is written. This is where post comment is written. This is where post comment is written. This is where post comment is written.'
// const audio = '/t-rex-roar.mp3'

// const post = {
//   state: 'uploading',
//   text,
//   image: '/beer.svg',
//   previews: [],
//   date: dayjs(),
// }
// const posts: PostType[] = ([
//   {
//     ...post,
//     image: undefined,
//   },
// {
//   ...post,
//   image: undefined,
//   video: {
//     src: 'https://www.youtube.com/embed/lJIrF4YjHfQ',
//     // '<iframe width="560" height="315" src="https://www.youtube.com/embed/lJIrF4YjHfQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
//     ratio: 315 / 560,
//   },
//   reachedNotebookLimit: true,
// },
// {
//   ...post,
//   previews: [
//     {
//       type: 'post',
//       title:
//         'If there’s title, title is shown here, but if not, begining part text is written here',
//       text: 'Name of user who orginally posted',
//     },
//     {
//       type: 'link',
//       image: '/link-preview.svg',
//       title:
//         'website title is written here, body text is written here, up to two lines are written here',
//       text: 'http://example.com',
//     },
//     {
//       type: 'studyflow',
//       title:
//         'Title of studyflow is shown here, body text is written here, up to two lines are written here',
//       text: 'Provided by user name',
//     },
//   ],
// },
// {
//   ...post,
//   audio: audio,
//   loopingAudio: audio,
// },
// {
//   ...post,
//   loopingAudio: audio,
// },
// {
//   ...post,
//   audio: audio,
// },
// {
//   ...post,
//   text: `Clicking "Read More" will show a modal. ${text} ${text} ${text} ${text} ${text}`,
// },
// {
//   ...post,
//   text: `Clicking "Read More" will show full text. ${text} ${text} ${text} ${text} ${text}`,
//   joinedToClass: true,
// },
// ] as Omit<PostType, 'id'>[]).map((post, i) => ({ ...post, id: i }))

export default observer(function Home() {
  const { data, isLoading } = useQuery('posts', () =>
    api.post.list({ limit: 20, offset: 0 }),
  )

  return (
    <div className="mt-8 flex">
      <div style={{ maxWidth: '640px' }} className="w-full pb-12 flex-shrink-0">
        <PostForm />
        {UploadingPostsStore.posts.map((post) => (
          <Post key={post.id} post={post} uploading={true} />
        ))}
        {isLoading && (
          <div className="flex-center mb-5">
            <Spin className="w-10 h-10 text-blue-primary animate-spin" />
          </div>
        )}
        {!isLoading &&
          data &&
          data.map((post) => <Post key={post.id} post={post} />)}
        <LevelComplete />
        <Phrase />
      </div>
      <div className="ml-10 flex-grow">
        <Notebook />
      </div>
    </div>
  )
})
