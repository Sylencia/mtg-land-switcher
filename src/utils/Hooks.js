import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)

      // If it's an object, we need to parse it first, else just return the item
      if (item) {
        return item instanceof Object ? JSON.parse(item) : item
      }

      return initialValue
    } catch (error) {
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
