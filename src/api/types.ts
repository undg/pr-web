// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.

type Action = 'GetSinks' | 'SetSinks' // and more

export type GetSinks = {
  /** uniq name, can be used as ID */
  name: string
  label: string
  /** volume is a number string */
  volume: string
  muted: boolean
}
export type GetWsMessage = {
  action: Action
  status: number // 400x
  payload?: GetSinks[] // and more
  error?: string
}

type SendSink = {
  name: string
  volume: string
}

export type SendWsMessate = {
  action: Action
  payload: SendSink
}
