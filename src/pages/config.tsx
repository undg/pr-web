import Head from 'components/head'
import { TopNav } from 'components/top-nav'
import { useConfig } from 'config/use-config'
import { dict } from 'constant'
import type { FC } from 'react'

export const Config: FC = () => {
  const [config, updateConfig] = useConfig()
  const handleChange = (type: keyof typeof config) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ [type]: e.currentTarget.value })
  }

  return (
    <div>
      <Head title={dict.headerConfig} />
      <TopNav />
      <div>
        <div>Config</div>
        <input value={config.host} onChange={handleChange('host')} />
        <input value={config.port} onChange={handleChange('port')} />
        <input value={config.endpoint} onChange={handleChange('endpoint')} />
        <div>{config.serverUrl}</div>
      </div>
    </div>
  )
}
