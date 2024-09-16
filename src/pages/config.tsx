import { Button } from 'components/button'
import { Layout } from 'components/layout'
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
    <Layout header={dict.headerConfig}>
      <div>
        <div>Config</div>
        <input value={config.hostname} onChange={handleChange('hostname')} />
        <input value={config.port} onChange={handleChange('port')} />
        <input value={config.endpoint} onChange={handleChange('endpoint')} />
        <div>{config.serverUrl}</div>
        <Button onClick={handleConfigDetect}>Auto detect</Button>
        <Button onClick={handleConfigReset}>Reset to default</Button>
      </div>
    </Layout>
  )
}
