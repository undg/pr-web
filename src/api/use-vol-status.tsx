import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { useCallback, useEffect } from 'react'
import { useDebounce } from '../utils/use-debounce'
import type { GetWsMessage, Message, VolStatus } from './types'
import { useWebSocketApi } from './use-web-socket-api'

export const volStatusAtom = atom<VolStatus>()
if (process.env.NODE_ENV !== 'production') {
  volStatusAtom.debugLabel = 'statusAtom'
}

const useFirstLoadUpdate = (sendMessage: (message: Message) => void) => {
  const handleRefresh = useCallback(() => {
    const message: Message = { action: 'BroadcastStatus' }
    sendMessage(message)
  }, [sendMessage])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])
}

export const useVolumeStatus = () => {
  const [volStatus, updateVolStatus] = useImmerAtom(volStatusAtom)
  useAtomDevtools(volStatusAtom)
  const { lastMessage, sendMessage } = useWebSocketApi()
  const debouncedVolStatus = useDebounce(volStatus, 100)

  useFirstLoadUpdate(sendMessage)

  // It updates status when backend server broadcasts new state
  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const incomeMessage = JSON.parse(lastMessage.data) as GetWsMessage
      updateVolStatus(draft => {
        if (incomeMessage.action === 'GetStatus' && !!incomeMessage.payload) {
          return incomeMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateVolStatus])

  // Send SetSinkVolume message to websocket, when debouncedVolStatus changes
  useEffect(() => {
    if (!debouncedVolStatus?.outputs) {
      return
    }

    debouncedVolStatus.outputs.forEach((output, i) => {
      if (output.volume === volStatus?.outputs[i].volume) {
        return
      }
      sendMessage({
        action: 'SetSinkVolume',
        payload: { name: output.name, volume: output.volume },
      })
    })
  }, [debouncedVolStatus?.outputs, volStatus?.outputs, sendMessage])

  // Send SetSinkInputVolume message to websocket, when debouncedVolStatus changes
  useEffect(() => {
    if (!debouncedVolStatus?.apps) {
      return
    }
    debouncedVolStatus.apps.forEach((app, i) => {
      if (app.volume === volStatus?.apps[i].volume) {
        return
      }
      sendMessage({
        action: 'SetSinkInputVolume',
        payload: { id: app.id, volume: app.volume },
      })
    })
  }, [debouncedVolStatus?.apps, sendMessage, volStatus?.apps])

  return { volStatus, updateVolStatus }
}
