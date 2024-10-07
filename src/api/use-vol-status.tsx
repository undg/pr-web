import { atom } from 'jotai'
import { useAtomDevtools } from 'jotai-devtools'
import { useImmerAtom } from 'jotai-immer'
import { useCallback, useEffect } from 'react'
import { useDebounce } from '../utils/use-debounce'
import type { GetWsMessage, VolStatus } from './types'
import { useWebSocketApi } from './use-web-socket-api'

export const volStatusAtom = atom<VolStatus>()
if (process.env.NODE_ENV !== 'production') {
  volStatusAtom.debugLabel = 'statusAtom'
}

const useFirstLoadUpdate = (sendMessage: (message: string) => void) => {
  const handleRefresh = useCallback(() => {
    sendMessage(JSON.stringify({ action: 'BroadcastStatus' }))
  }, [sendMessage])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])
}

export const useVolStatus = () => {
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
        if (incomeMessage.action === 'BroadcastStatus' && !!incomeMessage.payload) {
          return incomeMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateVolStatus])

  // Send message to websocket, when debouncedVolStatus changes
  useEffect(() => {
    if (!debouncedVolStatus) {
      return
    }
    for (const output of debouncedVolStatus.outputs) {
      sendMessage(
        JSON.stringify({
          action: 'SetSink',
          payload: { name: output.name, volume: output.volume, muted: output.muted },
        }),
      )
    }
  }, [debouncedVolStatus, sendMessage])

  return { volStatus, updateVolStatus }
}
