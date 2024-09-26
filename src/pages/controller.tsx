import type { Status, GetWsMessage } from 'api/types'
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

export const statusAtom = atom<Status>()
if (process.env.NODE_ENV !== 'production') {
  statusAtom.debugLabel = 'statusAtom'
}

export const ControllerOutput: React.FC = () => {
  const [status, updateStatus] = useImmerAtom(statusAtom)
  useAtomDevtools(statusAtom)
  const { sendMessage, lastMessage } = useWebSocketApi()
  const debouncedStatus = useDebounce(status, 100)

  // Send message to websocket, with debounde
  useEffect(() => {
    if (!debouncedStatus) {
      return
    }
    for (const output of debouncedStatus.outputs) {
      sendMessage(JSON.stringify({ action: 'SetSink', payload: { name: output.name, volume: output.volume } }))
    }
  }, [debouncedStatus, sendMessage])

  // This useEffect hook handles incoming WebSocket messages
  // It updates the sinks state when a 'GetStatus' action is received
  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const parsedMessage = JSON.parse(lastMessage.data) as GetWsMessage
      updateStatus(draft => {
        if (parsedMessage.action === 'GetStatus' && !!parsedMessage.payload) {
          return parsedMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateStatus])

  const handleRefresh = useCallback(() => {
    sendMessage(JSON.stringify({ action: 'GetStatus' }))
  }, [sendMessage])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

  const handleVolumeChange = useCallback(
    (name: string) => (newValue: number[]) => {
      updateStatus(draft => {
        const output = draft?.outputs.find(o => o.name === name)
        if (output) {
          output.volume = newValue[0].toString()
        }
      })
      navigator.vibrate([10])
    },
    [updateStatus],
  )

  const handleMuteToggle = useCallback(
    (name: string) => () => {
      updateStatus(draft => {
        const output = draft?.outputs.find(o => o.name === name)
        if (output) {
          output.muted = !output.muted
        }
      })
      navigator.vibrate([10])
    },
    [updateStatus],
  )

  return (
    <Layout header={dict.headerOutput}>
      <section className='flex flex-col gap-6 text-xl'>
        {status?.outputs.map(output => (
          <div
            key={output.name}
            className='grid items-center gap-x-4 gap-y-1'
            style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
          >
            <Toggle
              variant='outline'
              size='sm'
              pressed={output.muted}
              data-testid={testid.btnMuteToggle}
              onClick={handleMuteToggle(output.name)}
            >
              {output.muted ? <VolumeOff color='red' /> : <Volume />}
            </Toggle>
            <Small className='self-end truncate text-right text-xs'>{output.label}</Small>
            <div
              className={cn(
                'text-green-500',
                Number(output.volume) >= 75 && 'text-orange-500',
                Number(output.volume) >= 100 && 'text-red-500',
              )}
            >
              {output.volume}%
            </div>
            <Slider
              className='top-2 col-span-1 mb-4'
              name={output.label}
              title='Volume'
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              value={[Number(output.volume)]}
              step={1}
              onValueChange={handleVolumeChange(output.name)}
            />
          </div>
        ))}
      </section>
    </Layout>
  )
}

// @TODO (undg) 2024-09-14: Implemet Input controller
export const ControllerInput = ControllerOutput
