import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { Config } from './schema'
import { ConfigSchema } from './schema'
import { useAtomDevtools } from 'jotai-devtools'

const defaultConfig: Config = {
  host: 'localhost',
  port: 8448,
  endpoint: '/api/v1/ws',
  serverUrl: 'ws://localhost:8448/api/v1/ws',
}

export const configAtom = atomWithStorage<Config>('pr-web-config', defaultConfig)

export function useConfig(): [Config, (newConfig: Partial<Config>) => void] {
  const [config, setConfig] = useAtom(configAtom)
  useAtomDevtools(configAtom)

  const updateConfig = (newConfig: Partial<Omit<Config, 'serverUrl'>>) => {
    const updatedConfig = { ...config, ...newConfig }
    const parsedConfig = ConfigSchema.parse(updatedConfig)
    setConfig(parsedConfig)
  }

  return [config, updateConfig]
}
