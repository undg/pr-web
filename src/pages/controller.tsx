import type { GetSinks, GetWsMessage } from 'api/types'
import { useWebSocketApi } from 'api/use-web-socket-api'
import { Layout } from 'components/layout'
import { Slider } from 'components/slider'
import { Small } from 'components/typography'
import { MAX_VOLUME, MIN_VOLUME, dict } from 'constant'
import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { useCallback, useEffect } from 'react'
import { useDebounce } from 'utils/use-debounce'

export const volumeAtom = atom<number | null>(null)
if (process.env.NODE_ENV !== 'production') {
  volumeAtom.debugLabel = 'volumeAtom'
}

export const sinksAtom = atom<GetSinks[]>([])
if (process.env.NODE_ENV !== 'production') {
  sinksAtom.debugLabel = 'sinksAtom'
}

export const ControllerOutput: React.FC = () => {
  const [sinks, updateSinks] = useImmerAtom(sinksAtom)
  useAtomDevtools(sinksAtom)

  const { sendMessage, lastMessage } = useWebSocketApi()

  const debouncedSinks = useDebounce(sinks, 100)

  useEffect(() => {
    for (const sink of debouncedSinks) {
      sendMessage(JSON.stringify({ action: 'SetSink', payload: { name: sink.name, volume: sink.volume } }))
    }
  }, [debouncedSinks, sendMessage])

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
    },
    [updateSinks],
  )

  return (
    <Layout header={dict.headerOutput}>
      <section className='flex flex-col gap-8'>
        {sinks.map(sink => (
          <div key={sink.name} className='grid-col-2 grid' style={{ gridTemplateColumns: 'minmax(auto, 300px) auto' }}>
            <Small>{sink.label}</Small>
            <Slider
              className='mb-8'
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
