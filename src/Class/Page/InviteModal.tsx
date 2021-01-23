import React from 'react'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import Radio from 'Shared/Form/Radio'
import { Search as SearchIcon } from '@styled-icons/fa-solid/Search'
import api from 'api'
import Spin from 'assets/images/icons/Spin'
import { Class } from 'Class/types'
import useRecords from 'utils/useRecords'
import Loader from 'Shared/Loader'
import { useMutation } from 'react-query'
import useToggle from 'utils/useToggle'
import Alert from 'Shared/Modal/Alert'

type Props = {
  item: Class
  onClose(): void
}

export default function TagModal({ item, onClose }: Props) {
  const [search, setSearch] = React.useState('')
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { data, isFetching } = useRecords({
    key: ['searchNonMembers', { classId: item.id, search }],
    load: ({ limit, offset }) =>
      api.classes.nonMembers({ classId: item.id, search, limit, offset }),
    loadOnScroll: {
      ref: scrollRef,
      threshold: 350,
    },
  })

  const [selectedIds, setSelectedIds] = React.useState<number[]>([])
  const [openInvitedMessage, toggleInvitedMessage] = useToggle()

  const { mutate: sendInvite, isLoading: isInviting } = useMutation(
    api.classes.sendInvite,
    {
      onSettled() {
        toggleInvitedMessage()
      },
    },
  )

  React.useEffect(() => {
    setSelectedIds([])
  }, [search])

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 py-16"
      style={{ backdropFilter: 'blur(1px)', background: 'rgba(0, 0, 0, .1)' }}
    >
      {openInvitedMessage && (
        <Alert title="Successfully invited" onClose={onClose} />
      )}
      <div
        className="bg-white pb-4 mx-auto w-full flex flex-col h-full"
        style={{ maxWidth: '550px' }}
      >
        <div className="text-2xl uppercase text-center pt-6 pb-6 border-b border-gray-c5 relative flex-shrink-0">
          <div className="absolute top-0 left-0 bottom-0 flex-center pl-6 text-gray-5f">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={26} />
            </button>
          </div>
          Tag
          {selectedIds.length > 0 && (
            <div className="absolute top-0 right-0 bottom-0 flex-center pr-6">
              <button
                type="button"
                className="rounded-full bg-blue-primary text-white h-8 font-bold flex-center px-5 text-base"
                disabled={isInviting}
                onClick={() =>
                  sendInvite({ classId: item.id, userIds: selectedIds })
                }
              >
                {!isInviting && 'Send'}
                {isInviting && <Loader className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
        <div className="py-3 px-4 relative border-b border-gray-c5 flex-shrink-0">
          <div className="absolute top-0 left-0 bottom-0 flex-center ml-7 text-gray-a4">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            className="bg-gray-ef border border-gray-97 rounded-full h-9 flex items-center pl-8 pr-4 w-full"
            placeholder="Search name or email address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-grow overflow-auto" ref={scrollRef}>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((user) => {
                return (
                  <label
                    key={user.id}
                    className="block border-b border-gray-c5 flex items-center justify-between py-2 px-4 pr-7"
                  >
                    <div className="flex-center">
                      <img
                        src={user.avatar}
                        alt="image"
                        style={{ width: '45px', height: '45px' }}
                        className="rounded-full"
                      />
                      <div className="ml-3 flex flex-col justify-center">
                        <div className="text-lg font-bold">{user.name}</div>
                        <div className="text-gray-6b text-sm">
                          {user.language}
                        </div>
                      </div>
                    </div>
                    <Radio
                      size={22}
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => {
                        if (selectedIds.includes(user.id))
                          setSelectedIds(
                            selectedIds.filter((id) => id !== user.id),
                          )
                        else setSelectedIds([...selectedIds, user.id])
                      }}
                      name={name}
                      value={String(user.id)}
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
}
