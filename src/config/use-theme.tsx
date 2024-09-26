import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type Theme = 'light' | 'dark'
const themeAtom = atomWithStorage<Theme>('theme', 'light')
export const useTheme = () => {
  return useAtom(themeAtom)
}
