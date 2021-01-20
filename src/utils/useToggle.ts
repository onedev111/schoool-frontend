import { useState, useCallback } from 'react'

export default (initial = false): [boolean, () => void] => {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue((value) => !value), [])
  return [value, toggle]
}
