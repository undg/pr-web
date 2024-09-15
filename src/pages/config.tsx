import { Button } from 'components/button'
import Head from 'components/head'
import { TopNav } from 'components/top-nav'
import { defaultConfig, useConfig } from 'config/use-config'
import { dict } from 'constant'
import type { FC } from 'react'

export const Config: FC = () => {
  const [config, updateConfig] = useConfig()
  const handleChange = (type: keyof typeof config) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ [type]: e.currentTarget.value })
  }

  const handleConfigDetect = () => {
    updateConfig({
      hostname: window.location.hostname,
      port: window.location.port,
      endpoint: '/api/v1/ws',
    })
  }

  const handleConfigReset = () => {
    updateConfig(defaultConfig)
  }

  return (
    <div>
      <Head title={dict.headerConfig} />
      <TopNav />
      <div>
        <div>Config</div>
        <input value={config.hostname} onChange={handleChange('host')} />
        <input value={config.port} onChange={handleChange('port')} />
        <input value={config.endpoint} onChange={handleChange('endpoint')} />
        <div>{config.serverUrl}</div>
        <Button onClick={handleConfigDetect}>Auto detect</Button>
        <Button onClick={handleConfigReset}>Reset to default</Button>
      </div>
    </div>
  )
}
