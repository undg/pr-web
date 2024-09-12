import { Button } from 'components/button'
import Head from 'components/head'
import { Slider } from 'components/slider'
import { CONTROLLER_HEAD_TITLE, MAX_VOLUME, MIN_VOLUME } from 'constant'
import { useEffect, type ReactElement, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWebSocketApi } from 'api/use-web-socket-api'

import { atom, useAtom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const volumeAtom = atom<number | null>(null)
if (process.env.NODE_ENV !== 'production') {
  volumeAtom.debugLabel = 'volumeAtom'
}

export default function Controller(): ReactElement {
  const [volume, setVolume] = useAtom(volumeAtom)
  useAtomDevtools(volumeAtom)
  const { sendMessage, lastMessage } = useWebSocketApi()

  const debouncedVolume = useDebounce(volume, 100)

  useEffect(() => {
    if (debouncedVolume !== null) {
      sendMessage(JSON.stringify({ action: 'SetVolume', value: debouncedVolume }))
    }
  }, [debouncedVolume, sendMessage])

  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const parsedMessage = JSON.parse(lastMessage.data) as { action: string; value?: string }
      if (parsedMessage.action === 'GetVolume' && parsedMessage.value !== undefined) {
        setVolume(Number(parsedMessage.value))
      }
    }
  }, [lastMessage, setVolume])

  const handleRefresh = useCallback(() => {
    sendMessage(JSON.stringify({ action: 'GetVolume' }))
  }, [sendMessage])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  const handleVolumeChange = useCallback(
    (newValue: number[]) => {
      setVolume(newValue[0])
    },
    [setVolume],
  )

  return (
    <div>
      <Head title={CONTROLLER_HEAD_TITLE} />
      <Link to='/web/about' data-testid='goto-about'>
        <Button>About</Button>
      </Link>
      <Slider
        title='Volume'
        min={MIN_VOLUME}
        max={MAX_VOLUME}
        value={[volume ?? 0]}
        step={0.01}
        onValueChange={handleVolumeChange}
      />
      <Button onClick={handleRefresh}>Refresh</Button>
    </div>
  )
}
