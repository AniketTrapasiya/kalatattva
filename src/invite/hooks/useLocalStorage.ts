import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'

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

  /*
   * Ported note: the original seeded state directly from localStorage. These pages are
   * prerendered now, so reading storage during the first render throws on the server and
   * mismatches on the client (React #418), which aborts hydration for the whole page.
   * State therefore starts at `initialValue` — matching the server HTML — and the stored
   * value is adopted in an effect, after hydration.
   */
  const [value, setValue] = useState<T>(initialValue)
  const hydrated = useRef(false)

  useEffect(() => {
    setValue(read())
    hydrated.current = true
    // `read` closes over key/initialValue/isValid; re-running on key change is the intent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    // Don't write back the placeholder before the stored value has been read.
    if (!hydrated.current) return
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
