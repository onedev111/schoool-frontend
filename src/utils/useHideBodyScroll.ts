import React from 'react'

let count = 0

export default function useHideBodyScroll() {
  React.useEffect(() => {
    if (count === 0) document.body.style.overflow = 'hidden'
    count++

    return () => {
      if (count === 1) document.body.style.overflow = ''
      count--
    }
  }, [])
}
