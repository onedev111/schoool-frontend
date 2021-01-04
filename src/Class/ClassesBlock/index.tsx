import React from 'react'
import cn from 'classnames'
import Scrollbars from 'react-custom-scrollbars'

type Props = {
  className?: string
}

export default function ClassesBlock({ className }: Props) {
  return (
    <div className={cn('bg-white shadow', className)}>
      <div className="text-right">
        <a href="#" className="text-blue-primary text-lg py-3 px-4 block">
          See All
        </a>
        <div className="flex">
          <Scrollbars style={{ width: '100%', height: '123px' }}>
            <div className="whitespace-no-wrap">
              <div className="inline-block h-full w-8" />
              {new Array(10).fill(null).map((_, i) => (
                <div
                  key={i}
                  className="inline-block whitespace-normal pb-5"
                  style={{ width: '112px' }}
                >
                  <div
                    className="bg-blue-primary rounded-full mx-auto mb-3"
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div className="text-black text-sm text-center">말킴 POD</div>
                </div>
              ))}
              <div className="inline-block h-full w-8" />
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  )
}
