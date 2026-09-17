import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

/**
 * State mirrored to localStorage. Stored values are validated on read so a
 * corrupted or outdated entry falls back to `initialValue` instead of crashing.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const read = (): T => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      const parsed: unknown = JSON.parse(raw)
      return isValid(parsed) ? parsed : initialValue
    } catch {
      return initialValue
    }
  }

  const [value, setValue] = useState<T>(read)

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable (private mode, quota) — the in-memory state still works.
    }
  }, [key, value])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) setValue(read())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, setValue]
}
