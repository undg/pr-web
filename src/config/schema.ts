import { atom } from 'jotai'
import { z } from 'zod'

export const ConfigSchema = z
  .object({
    host: z.string(),
    port: z.number().int().positive(),
    endpoint: z.string().startsWith('/'),
    serverUrl: z.string().optional(),
  })
  .transform(({ host, port, endpoint }) => ({
    host,
    port,
    endpoint,
    serverUrl: `ws://${host}:${port}${endpoint}`,
  }))

export type Config = z.infer<typeof ConfigSchema>

export const ConfigAtom = atom<Config>({
  host: 'localhost',
  port: 8448,
  endpoint: '/api/v1/ws',
  serverUrl: 'ws://localhost:8448/api/v1/ws',
})
