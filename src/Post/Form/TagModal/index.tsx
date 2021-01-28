import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import Radio from 'Shared/Form/Radio'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import { State } from 'Post/Form/State'
import { observer } from 'mobx-react-lite'
import { useInfiniteQuery } from 'react-query'
import api from 'api'
import { TagToInsert } from 'Post/types'
import Spin from 'assets/images/icons/Spin'
import { insertElementToContentEditable } from 'utils/contentEditable'
import useHideBodyScroll from 'utils/useHideBodyScroll'
import { createTagElement } from 'utils/tags'

const typeName: Record<TagToInsert['type'], string> = {
  user: 'Friend',
  class: 'Class',
  studyflow: 'StudyFlow',
}

type Props = {
  state: State
}

const scrollLoadThreshold = 350

export default observer(function TagModal({ state }: Props) {
  const [search, setSearch] = React.useState('')
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['searchTags', { search }],
    ({ pageParam = 0 }) => {
      return api.post.searchTags({ search, offset: pageParam * 20 })
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length > 0 ? pages.length : undefined,
    },
  )

  useHideBodyScroll()

  const onClose = () => state.backToForm()

  // eslint-disable-next-line
  const onScroll = (e: any) => {
    const el = (e as { target: HTMLElement }).target
    if (
      hasNextPage &&
      !isLoading &&
      !isFetching &&
      el.scrollHeight - el.offsetHeight - el.scrollTop <= scrollLoadThreshold
    ) {
      fetchNextPage()
    }
  }

  const addTag = (tag: TagToInsert) => {
    const editor = state.editorRef.current as HTMLElement
    const link = createTagElement(tag)
    insertElementToContentEditable(link, editor, state.selectionRange)
    state.setHTML(editor.innerHTML)
    state.backToForm()
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 py-16"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
    >
      <div
        className="bg-white pb-4 mx-auto w-full flex flex-col h-full"
        style={{ maxWidth: '550px' }}
      >
        <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5 relative flex-shrink-0">
          <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={26} />
            </button>
          </div>
          Tag
        </div>
        <div className="py-3 px-4 relative border-b border-gray-c5 flex-shrink-0">
          <div className="absolute top-0 left-0 bottom-0 flex-center ml-7 text-gray-a4">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            className="bg-gray-ef border border-gray-97 rounded-full h-9 flex items-center pl-8 pr-4 w-full"
            placeholder="Search friends, class, studyflow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-grow overflow-auto" onScroll={onScroll}>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((tag) => {
                const { id, name, image, type } = tag

                return (
                  <label
                    key={id}
                    className="block border-b border-gray-c5 flex items-center justify-between py-2 px-4 pr-7"
                  >
                    <div className="flex-center">
                      <img
                        src={image}
                        alt="image"
                        style={{ width: '45px', height: '45px' }}
                        className="rounded-full"
                      />
                      <div className="ml-3 flex flex-col justify-center">
                        <div className="text-lg font-bold">{name}</div>
                        <div className="text-gray-6b text-sm">
                          {typeName[type]}
                        </div>
                      </div>
                    </div>
                    <Radio
                      size={22}
                      checked={false}
                      onChange={() => addTag(tag)}
                      name={name}
                      value={String(id)}
                    />
                  </label>
                )
              })}
            </React.Fragment>
          ))}
          {isFetching && (
            <div className="flex-center my-5">
              <Spin className="w-10 h-10 text-blue-primary animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
