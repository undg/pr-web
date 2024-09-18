// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.

export type WsMessage = {
  action: 'GetSinks' | 'SetSinks' // and more
  status: number // 400x
  value?: GetSinks[] // and more
  error?: string
}
export type GetSinks = {
  name: string
  label: string
  volume: number
  muted: boolean
}
