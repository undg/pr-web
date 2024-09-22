import type { GetSinks, GetWsMessage } from 'api/types'
import { useWebSocketApi } from 'api/use-web-socket-api'
import { Layout } from 'components/layout'
import { Slider } from 'components/slider'
import { Toggle } from 'components/toggle'
import { Small } from 'components/typography'
import { MAX_VOLUME, MIN_VOLUME, dict, testid } from 'constant'
import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { Volume, VolumeOff } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { cn } from 'utils/cn'
import { useDebounce } from 'utils/use-debounce'

export const sinksAtom = atom<GetSinks[]>([])
if (process.env.NODE_ENV !== 'production') {
  sinksAtom.debugLabel = 'sinksAtom'
}

export const ControllerOutput: React.FC = () => {
  const [sinks, updateSinks] = useImmerAtom(sinksAtom)
  useAtomDevtools(sinksAtom)
  const { sendMessage, lastMessage } = useWebSocketApi()
  const debouncedSinks = useDebounce(sinks, 100)

  // Send message to websocket, with debounde
  useEffect(() => {
    for (const sink of debouncedSinks) {
      sendMessage(JSON.stringify({ action: 'SetSink', payload: { name: sink.name, volume: sink.volume } }))
    }
  }, [debouncedSinks, sendMessage])

  // This useEffect hook handles incoming WebSocket messages
  // It updates the sinks state when a 'GetSinks' action is received
  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const parsedMessage = JSON.parse(lastMessage.data) as GetWsMessage
      updateSinks(draft => {
        if (parsedMessage.action === 'GetSinks' && Array.isArray(parsedMessage.payload)) {
          return parsedMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateSinks])

  const handleRefresh = useCallback(() => {
    sendMessage(JSON.stringify({ action: 'GetVolume' }))
  }, [sendMessage])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  const handleVolumeChange = useCallback(
    (name: string) => (newValue: number[]) => {
      updateSinks(draft => {
        const sink = draft.find(s => s.name === name)
        if (sink) {
          sink.volume = newValue[0].toString()
        }
      })
      navigator.vibrate([10])
    },
    [updateSinks],
  )
  const handleMuteToggle = useCallback(
    (name: string) => () => {
      updateSinks(draft => {
        const sink = draft.find(s => s.name === name)
        if (sink) {
          sink.muted = !sink.muted
        }
      })
      navigator.vibrate([10])
    },
    [updateSinks],
  )

  return (
    <Layout header={dict.headerOutput}>
      <section className='flex flex-col gap-6 text-xl'>
        {sinks.map(sink => (
          <div
            key={sink.name}
            className='grid items-center gap-x-4 gap-y-1'
            style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
          >
            <Toggle
              variant='outline'
              size='sm'
              pressed={sink.muted}
              data-testid={testid.btnMuteToggle}
              onClick={handleMuteToggle(sink.name)}
            >
              {sink.muted ? <VolumeOff color='red' /> : <Volume />}
            </Toggle>
            <Small className='self-end truncate text-right text-xs'>{sink.label}</Small>
            <div
              className={cn(
                'text-green-500',
                Number(sink.volume) >= 75 && 'text-orange-500',
                Number(sink.volume) >= 100 && 'text-red-500',
              )}
            >
              {sink.volume}%
            </div>
            <Slider
              className='top-2 col-span-1 mb-4'
              name={sink.label}
              title='Volume'
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              value={[Number(sink.volume)]}
              step={1}
              onValueChange={handleVolumeChange(sink.name)}
            />
          </div>
        ))}
      </section>
    </Layout>
  )
}

// @TODO (undg) 2024-09-14: Implemet Input controller
export const ControllerInput = ControllerOutput
