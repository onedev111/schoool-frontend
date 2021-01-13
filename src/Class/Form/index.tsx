import React from 'react'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Camera } from '@styled-icons/entypo/Camera'
import cn from 'classnames'

type Props = {
  onClose(): void
}

const values = {
  name: '',
  description: '',
  isPublic: false,
  autoApprove: false,
}

type Values = typeof values

const state = makeAutoObservable({
  values,
  update(values: Partial<Values>) {
    Object.assign(this.values, values)
  },
})

const maxLength = 200

export default observer(function ClassForm({ onClose }: Props) {
  return (
    <Modal width={840}>
      <div className="mt-8 mb-7 uppercase text-center text-2xl relative">
        <button onClick={onClose}>
          <X size={32} className="absolute top-0 right-0 mr-7 text-gray-5f" />
        </button>
        Create Class
      </div>
      <div className="flex items-center mt-10">
        <div className="h-10 flex items-center justify-end w-56 mr-8 text-lg">
          Name of Class
        </div>
        <input
          className="rounded border border-gray-8b text-gray-6b px-4 w-400px h-10"
          placeholder="Enter your class name"
          value={state.values.name}
          onChange={(e) => state.update({ name: e.target.value })}
        />
      </div>
      <div className="flex mt-10">
        <div className="h-10 flex items-center justify-end w-56 mr-8 text-lg">
          Description
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0 -mt-6 text-sm mr-2">
            {state.values.description.length} / {maxLength}
          </div>
          <textarea
            rows={3}
            className="rounded border border-gray-8b text-gray-6b px-4 py-2 w-400px"
            placeholder="Enter your class name"
            value={state.values.description}
            onChange={(e) => state.update({ description: e.target.value })}
          />
        </div>
      </div>
      <div className="flex mt-10">
        <div className="h-10 flex items-center justify-end w-56 mr-8 text-lg">
          Cover Photo
        </div>
        <div className="w-400px">
          <div
            className="rounded border border-gray-8b flex-center"
            style={{ width: '100px', height: '100px' }}
          >
            <Camera className="text-black" size={36} />
          </div>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="h-11 flex items-center justify-end w-56 mr-8 text-lg">
          Privacy Option
        </div>
        <div className="w-400px">
          <div className="flex h-11 rounded text-lg bg-gray-ef">
            <button
              type="button"
              onClick={() => state.update({ isPublic: true })}
              className={cn(
                'w-1/2 rounded flex-center cursor-pointer',
                state.values.isPublic && 'bg-white border border-gray-97',
              )}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => state.update({ isPublic: false })}
              className={cn(
                'w-1/2 rounded flex-center cursor-pointer',
                !state.values.isPublic && 'bg-white border border-gray-97',
              )}
            >
              Private
            </button>
          </div>
          <div className="mt-4 text-lg text-gray-2a">
            Public
            <br />
            Anyone can find this class. It is searchable.
            <div className="h-4"></div>
            Private
            <br />
            This class is hidden from public view. It is not searchable. Only
            members can see the posts of this class. To have new members, you
            must invite them to join your class.
          </div>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="h-11 flex items-center justify-end w-56 mr-8 text-lg">
          Approval of Requests
        </div>
        <div className="w-400px">
          <div className="flex h-11 rounded text-lg bg-gray-ef">
            <button
              type="button"
              onClick={() => state.update({ autoApprove: true })}
              className={cn(
                'w-1/2 rounded flex-center cursor-pointer',
                state.values.autoApprove && 'bg-white border border-gray-97',
              )}
            >
              Automatically
            </button>
            <button
              type="button"
              onClick={() => state.update({ autoApprove: false })}
              className={cn(
                'w-1/2 rounded flex-center cursor-pointer',
                !state.values.autoApprove && 'bg-white border border-gray-97',
              )}
            >
              Manual
            </button>
          </div>
          <div className="mt-4 text-lg text-gray-2a">
            If you choose Automatically, requests to join this class are
            approved automatically. If you choose Manually, you have to approve
            each request manually.
          </div>
        </div>
      </div>
      <button
        type="button"
        className="ml-64 mt-10 mb-12 w-400px rounded-full bg-blue-primary text-white font-bold flex-center h-10"
      >
        Create
      </button>
    </Modal>
  )
})
