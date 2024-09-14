import { useWebSocketApi } from 'api/use-web-socket-api'
import Head from 'components/head'
import { Slider } from 'components/slider'
import { MAX_VOLUME, MIN_VOLUME, dict } from 'constant'
import { useDebounce } from 'hooks/use-debounce'
import { useCallback, useEffect } from 'react'

import { TopNav } from 'components/top-nav'
import { atom, useAtom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'

export const volumeAtom = atom<number | null>(null)
if (process.env.NODE_ENV !== 'production') {
  volumeAtom.debugLabel = 'volumeAtom'
}

export const ControllerOutput: React.FC = () => {
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
    <div className='container mx-auto p-4'>
      <Head title={dict.headerOutput} />
      <TopNav />
      <main>
        <section className='mb-8'>
          <Slider
            title='Volume'
            min={MIN_VOLUME}
            max={MAX_VOLUME}
            value={[volume ?? 0]}
            step={0.01}
            onValueChange={handleVolumeChange}
          />
        </section>
      </main>
    </div>
  )
}

// @TODO (undg) 2024-09-14: Implemet Input controller
export const ControllerInput = ControllerOutput
