import { useState } from 'react'

export default (initial = false): [boolean, () => void] => {
  const [value, setValue] = useState(initial)
  return [value, () => setValue(!value)]
}
