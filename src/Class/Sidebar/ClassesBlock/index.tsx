import React from 'react'
import cn from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import { ChevronLeft } from '@styled-icons/bootstrap/ChevronLeft'
import { ChevronRight } from '@styled-icons/bootstrap/ChevronRight'
import { useData } from 'Class/Sidebar/ClassesBlock/Store'
import routes from 'routes'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import style from './style.module.css'

type Props = {
  className?: string
}

const width = 112

export default observer(function ClassesBlock({ className }: Props) {
  const [scrollRef] = React.useState<{ current: HTMLElement | null }>({
    current: null,
  })
  const { items, isFetching } = useData({
    ref: scrollRef,
    direction: 'horizontal',
    threshold: 300,
  })
  const ref = React.useRef<{ view: HTMLElement }>()

  React.useEffect(() => {
    scrollRef.current = ref.current?.view || null
  }, [])

  const scroll = (add: number) => {
    const el = ref.current
    if (!el) return

    el.view.scroll({
      left: (Math.round(el.view.scrollLeft / width) + add * 3) * width,
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
        <Scroll style={{ width: '100%', height: '150px' }} ref={ref}>
          <div className="whitespace-no-wrap">
            <div className="inline-block h-full w-10" />
            {items?.map((item) => (
              <Link
                key={item.id}
                to={routes.class(item.id)}
                className="inline-block whitespace-normal pb-5 align-top"
                style={{ width: `${width}px` }}
              >
                <div
                  className="rounded-full bg-center bg-cover mx-auto mb-3"
                  style={{
                    width: '70px',
                    height: '70px',
                    backgroundImage: `url("${item.image}")`,
                  }}
                />
                <div
                  className={cn(
                    'text-black text-sm text-center px-2',
                    style.className,
                  )}
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="inline-block h-full w-10" />
          </div>
        </Scroll>
      </div>
    </div>
  )
})
