import React from 'react'

export default function useVirtualList<T>({
  items = [],
  rowHeight,
}: {
  items?: T[]
  rowHeight: number
}) {
  const [scrollRef] = React.useState<{ current: HTMLDivElement | null }>({
    current: null,
  })

  const [state, setState] = React.useState<{
    offset: number
    count: number
    all: T[]
    items: T[]
  }>({
    offset: 0,
    count: 0,
    all: [],
    items: [],
  })

  const onScroll = () => {
    if (!scrollRef.current) return

    const el = scrollRef.current
    const offset = Math.floor(el.scrollTop / rowHeight)
    const count = Math.ceil(el.offsetHeight / rowHeight) + 1
    setState((state) =>
      state.offset === offset && state.count === count && state.all === items
        ? state
        : {
            offset,
            count,
            all: items,
            items: items.slice(offset, offset + count),
          },
    )
  }

  const init = (el: HTMLDivElement) => {
    scrollRef.current = el
    onScroll()
  }

  React.useEffect(() => onScroll(), [items])

  return {
    state,
    render(renderer: (item: T, index: number) => React.ReactNode) {
      const height = `${rowHeight}px`
      const { offset } = state

      return (
        <div className="overflow-auto" ref={init} onScroll={onScroll}>
          <div
            className="relative"
            style={{
              height: state.all.length * rowHeight,
            }}
          >
            {state.items.map((item, index) => (
              <div
                key={index}
                className="absolute left-0 right-0"
                style={{
                  height,
                  top: `${(offset + index) * rowHeight}px`,
                }}
              >
                {renderer(item, index)}
              </div>
            ))}
          </div>
        </div>
      )
    },
  }
}
