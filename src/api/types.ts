// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.

type ActionIn = 'GetSinks' | 'GetStatus' | 'SetSinks' | 'BroadcastStatus'
// and more

type ActionOut = 'SetSinks' | 'SetMuded'

type Outputs = {
  /** uniq device index */
  id: number
  /** uniq name, can be used as ID */
  name: string
  label: string
  /** volume is a number string, percent */
  volume: string
  muted: boolean
}

type Apps = {
  /** uniq app index */
  id: number
  /** uniq Outputs.id that can be used to corelate app with output */
  outputId: number
  label: string
  /** volume is a number string, percent */
  volume: string
  muted: boolean
}

export type VolStatus = {
  outputs: Outputs[]
  apps: Apps[]
}

export type GetSinks = {
  /** uniq name, can be used as ID */
  name: string
  label: string
  /** volume is a number string */
  volume: string
  muted: boolean
}

export type GetWsMessage = {
  action: ActionIn
  status: number // 400x
  payload?: VolStatus
  error?: string
}

type SendSink = {
  name: string
  volume: string
  muted: boolean
}

export type SendWsMessage = {
  action: ActionOut
  payload: SendSink
}
