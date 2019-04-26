import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item)
      } catch {
        return item
      }
    } else {
      return initialValue
    }
  })

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    valueToStore instanceof Object
      ? localStorage.setItem(key, JSON.stringify(valueToStore))
      : localStorage.setItem(key, valueToStore)
  }

  return [storedValue, setValue]
}

export const useLockBodyScroll = () => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = originalOverflow)
  }, [])
}
