import { useEffect } from 'react'
import type { GetWsMessage, Status } from './types'
import { useWebSocketApi } from './use-web-socket-api'
import { useImmerAtom } from 'jotai-immer'
import { atom } from 'jotai'

export const statusAtom = atom<Status>()
if (process.env.NODE_ENV !== 'production') {
  statusAtom.debugLabel = 'statusAtom'
}

/**
 * Custom hook for handling WebSocket messages
 * It updates status when backend server broadcasts new state
 */
export const useWebSocketStatusUpdate = () => {
  const { lastMessage } = useWebSocketApi()
  const [, updateStatus] = useImmerAtom(statusAtom)

  useEffect(() => {
    if (lastMessage && typeof lastMessage.data === 'string') {
      const incomeMessage = JSON.parse(lastMessage.data) as GetWsMessage
      updateStatus(draft => {
        if (incomeMessage.action === 'BroadcastStatus' && !!incomeMessage.payload) {
          return incomeMessage.payload
        }
        return draft
      })
    }
  }, [lastMessage, updateStatus])
}
