import React from 'react'

export const useLocalStorage = (
  key: string,
): [string | null, (value: string | null) => void] => {
  const [value, setValueFromEvent] = React.useState<string | null>(() =>
    localStorage.getItem(key),
  )

  React.useEffect(() => {
    const listener = ({
      detail,
    }: {
      detail: { key: string; value: string | null }
    }) => {
      if (detail.key === key && detail.value !== value) {
        if (detail.value === null) localStorage.removeItem(key)
        else localStorage.setItem(key, detail.value)
        setValueFromEvent(detail.value)
      }
    }

    window.addEventListener('localStorage', listener as () => void)
    return () =>
      window.removeEventListener('localStorage', listener as () => void)
  }, [value, setValueFromEvent])

  const setValue = (value: string | null) => {
    const event = new CustomEvent('localStorage', { detail: { key, value } })
    window.dispatchEvent(event)
  }

  return [value, setValue]
}
