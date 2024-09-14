import Head from 'components/head'
import { TopNav } from 'components/top-nav'
import { useConfig } from 'config/use-config'
import { dict } from 'constant'
import type { FC } from 'react'

export const Config: FC = () => {
  const [config] = useConfig()
  return (
    <div>
      <Head title={dict.headerConfig} />
      <TopNav />
      <div>Config</div>
      <div>{config.host}</div>
      <div>{config.port}</div>
      <div>{config.endpoint}</div>
      <div>{config.serverUrl}</div>
    </div>
  )
}
