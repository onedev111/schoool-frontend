import React from 'react'
import PostForm from './PostForm'
import Post from './Post'
import LevelComplete from './LevelComplete'
import Phrase from './Phrase'
import Notebook from './Notebook'
import { Post as PostType } from './Post/types'

const text =
  'This is where post comment is written. This is where post comment is written. This is where post comment is written. This is where post comment is written.'
const audio = '/t-rex-roar.mp3'

const post = {
  text,
  image: '/beer.svg',
  previews: [],
  date: new Date(),
}
const posts: PostType[] = ([
  {
    ...post,
    image: undefined,
  },
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
] as Omit<PostType, 'id'>[]).map((post, i) => ({ ...post, id: i }))

export default function Home() {
  return (
    <div className="mt-8 flex">
      <div style={{ maxWidth: '640px' }} className="w-full pb-12 flex-shrink-0">
        <PostForm />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <LevelComplete />
        <Phrase />
      </div>
      <div className="ml-10 flex-grow">
        <Notebook />
      </div>
    </div>
  )
}
