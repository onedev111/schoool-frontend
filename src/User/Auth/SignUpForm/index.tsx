import React from 'react'
import { User } from '@styled-icons/boxicons-solid/User'
import cn from 'classnames'

export default function SignUpForm() {
  const [level, setLevel] = React.useState('Basic')

  return (
    <div className="h-full flex-center">
      <div
        className="shadow bg-white py-10 px-12 w-full"
        style={{ maxWidth: '640px' }}
      >
        <div className="mb-5">
          <label className="flex items-center cursor-pointer">
            <div
              className="bg-gray-bb text-white flex-center rounded-full mr-4"
              style={{ width: '100px', height: '100px' }}
            >
              <User size={72} />
            </div>
            <div className="text-blue-primary text-lg font-bold">
              Profile Photo
            </div>
          </label>
        </div>
        <div className="mb-8">
          <div className="text-lg ml-1 mb-1">Introduction</div>
          <textarea
            className="rounded resize-none border border-gray-8b text-gray-6b py-3 px-4 w-full"
            rows={3}
            placeholder="Introduce yourself briefly. (optional)"
          />
        </div>
        <div className="mb-8">
          <div className="text-lg ml-1 mb-1 uppercase">Level of English</div>
          <div className="flex">
            <div
              className={cn(
                'h-10 cursor-pointer flex-center border border-gray-97 w-1/3 rounded-l',
                level === 'Basic' && 'bg-gray-dc',
              )}
              onClick={() => setLevel('Basic')}
            >
              Basic
            </div>
            <div
              className={cn(
                'h-10 cursor-pointer flex-center border-t border-b border-gray-97 w-1/3',
                level === 'Intermediate' && 'bg-gray-dc',
              )}
              onClick={() => setLevel('Intermediate')}
            >
              Intermediate
            </div>
            <div
              className={cn(
                'h-10 cursor-pointer flex-center border border-gray-97 w-1/3 rounded-r',
                level === 'Advanced' && 'bg-gray-dc',
              )}
              onClick={() => setLevel('Advanced')}
            >
              Advanced
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg ml-1 mb-1 uppercase">Language</div>
          <select className="h-10 w-full text-gray-6b px-4 bg-white rounded border border-gray-8b">
            <option>English</option>
            <option>Korean</option>
          </select>
        </div>
        <div className="mb-10">
          <div className="text-lg ml-1 mb-1">Location</div>
          <input
            className="rounded border border-gray-8b text-gray-6b px-4 w-full h-10"
            placeholder="Where do you live? (optional)"
          />
        </div>
        <div className="flex-center">
          <input
            type="submit"
            className="bg-blue-primary rounded-full h-10 flex-center text-white font-bold w-full cursor-pointer"
            value="Submit"
            style={{ maxWidth: '300px' }}
          />
        </div>
      </div>
    </div>
  )
}
