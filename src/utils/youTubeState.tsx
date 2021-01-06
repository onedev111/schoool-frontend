import React from 'react'
import { makeAutoObservable, action } from 'mobx'
import cn from 'classnames'
import { X } from '@styled-icons/boxicons-regular/X'

type Props = {
  youtubeId?: string
  className?: string
  close?: boolean
  onChange?(id?: string): void
}

const getVideoRatio = async (id: string) => {
  try {
    if (id) {
      const req = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}`,
      )
      if (req.headers.get('content-type') === 'application/json') {
        const data = await req.json()
        return data.height / data.width
      }
    }
  } catch (err) {
    // noop
  }
}

const createYouTubeState = ({
  youtubeId,
  className,
  close,
  onChange,
}: Props) => {
  return makeAutoObservable({
    el: null as HTMLElement | null,
    setEl(el: HTMLElement | null) {
      this.el = el
    },
    height: undefined as number | undefined,
    setHeight() {
      if (this.el && this.ratio)
        this.height = this.el.getBoundingClientRect().width * this.ratio
      else this.height = undefined
    },
    youtubeId,
    ratio: undefined as number | undefined,
    setYouTubeId(id?: string, ratio?: number) {
      if (id) {
        if (ratio) {
          this.youtubeId = id
          this.ratio = ratio
          this.setHeight()
          onChange && onChange(id)
        } else {
          getVideoRatio(id).then(
            action((ratio: number | undefined) =>
              this.setYouTubeId(ratio !== undefined ? id : undefined, ratio),
            ),
          )
        }
      } else {
        this.youtubeId = undefined
        onChange && onChange()
      }
    },
    setRatio(ratio?: number) {
      this.ratio = ratio
    },
    get video() {
      return (
        <div
          ref={(el) => {
            this.setEl(el)
            if (el && this.ratio) this.setHeight()
          }}
          className={cn('relative', className)}
        >
          {this.youtubeId && this.height && (
            <>
              {close && (
                <button
                  type="button"
                  className="w-10 h-10 flex-center text-white absolute top-0 right-0 mt-5 mr-7 bg-gray-6b"
                  onClick={() => this.setYouTubeId()}
                >
                  <X size={28} />
                </button>
              )}
              <iframe
                className="w-full"
                height={this.height}
                src={`https://www.youtube.com/embed/${this.youtubeId}?feature=oembed`}
                frameBorder="-1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          )}
        </div>
      )
    },
  })
}

export type State = ReturnType<typeof createYouTubeState>

export default function useYouTubeState(props: Props) {
  const [state] = React.useState(() => {
    const state = createYouTubeState(props)
    state.setYouTubeId(state.youtubeId)
    return state
  })
  return state
}
