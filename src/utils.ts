import { useLayoutEffect, useState } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchMedia(query).matches)

  useLayoutEffect(() => {
    const mediaQuery = matchMedia(query)

    function onMediaQueryChange(): void {
      setMatches(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', onMediaQueryChange)

    return (): void => {
      mediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [query])

  return matches
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
