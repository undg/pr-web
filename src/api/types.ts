// @TODO (undg) 2024-09-19: generate those types on the BE or generate them from GetSchema API provided by the server.

type ActionIn = 'GetStatus' | 'GetSinks' | 'GetCards' | 'GetSchema' | 'GetBuildInfo' | 'GetOutputs'
// and more

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

type BuildInfo = {
  gitVersion: string
  gitCommit: string
  buildDate: string
  goVersion: string
  compiler: string
  platform: string
}

export type VolStatus = {
  outputs: Outputs[]
  apps: Apps[]
  /** Backend server metadata */
  buildInfo: BuildInfo
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

export type Message =
  | {
      action: 'SetSinkVolume'
      payload: { name: string; volume: string }
    }
  | {
      action: 'SetSinkMuted'
      payload: { name: string; muted: boolean }
    }
  | {
      action: 'SetSinkInputVolume'
      payload: { id: number; volume: string }
    }
  | {
      action: 'SetSinkInputMuted'
      payload: { id: number; muted: boolean }
    }
  | { action: 'BroadcastStatus' }
