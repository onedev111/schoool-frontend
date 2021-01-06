import React from 'react'
import cn from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import { ChevronLeft } from '@styled-icons/bootstrap/ChevronLeft'
import { ChevronRight } from '@styled-icons/bootstrap/ChevronRight'

type Props = {
  className?: string
}

const width = 112

export default function ClassesBlock({ className }: Props) {
  const ref = React.useRef()

  const scroll = (add: number) => {
    const el = ((ref.current as unknown) as { view: HTMLElement }).view

    el.scroll({
      left: (Math.round(el.scrollLeft / width) + add * 3) * width,
      behavior: 'smooth',
    })
  }

  const prev = () => scroll(-1)

  const next = () => scroll(1)

  const Scroll = Scrollbars as any

  return (
    <div className={cn('bg-white shadow', className)}>
      <div className="flex items-center justify-between py-3 pl-7 pr-4">
        <div className="text-gray-6b text-lg uppercase">Explore Classes</div>
        <a href="#" className="text-blue-primary text-lg block">
          See All
        </a>
      </div>
      <div className="flex relative">
        <button
          type="button"
          className="bg-white rounded-full flex-center absolute top-0 left-0 mt-4 ml-3 z-10"
          style={{
            width: '38px',
            height: '38px',
            boxShadow: '0px 2px 6px #C3C3C3',
          }}
          onClick={prev}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="bg-white rounded-full flex-center absolute top-0 right-0 mt-4 mr-3 z-10"
          style={{
            width: '38px',
            height: '38px',
            boxShadow: '0px 2px 6px #C3C3C3',
          }}
          onClick={next}
        >
          <ChevronRight size={22} />
        </button>
        <Scroll style={{ width: '100%', height: '123px' }} ref={ref}>
          <div className="whitespace-no-wrap">
            <div className="inline-block h-full w-10" />
            {new Array(10).fill(null).map((_, i) => (
              <div
                key={i}
                className="inline-block whitespace-normal pb-5"
                style={{ width: `${width}px` }}
              >
                <div
                  className="bg-blue-primary rounded-full mx-auto mb-3"
                  style={{ width: '70px', height: '70px' }}
                />
                <div className="text-black text-sm text-center">말킴 POD</div>
              </div>
            ))}
            <div className="inline-block h-full w-10" />
          </div>
        </Scroll>
      </div>
    </div>
  )
}
