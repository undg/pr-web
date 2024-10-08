import type { FC } from 'react'
import { useVolStatus } from '../api/use-vol-status'
import { Button } from '../primitives/button'
import { Layout } from '../components/layout'
import { H3, Muted, P, Small } from '../primitives/typography'
import { defaultConfig, useConfig } from '../config/use-config'
import { dict } from '../constant'
import { Input } from '../primitives/input'

export const Config: FC = () => {
  const [config, updateConfig] = useConfig()
  const { volStatus } = useVolStatus()

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
      <section>
        <H3>Config</H3>
        <div className='flex justify-start'>
          <Input label='hostname' value={config.hostname} onChange={handleChange('hostname')} />
          <Input label='port' className='w-16' value={config.port} onChange={handleChange('port')} />
          <Input label='endpoint' value={config.endpoint} onChange={handleChange('endpoint')} />
        </div>
        <P>Full serverUrl: </P>
        <Input disabled value={config.serverUrl} />
        <div className='mt-4 flex justify-between gap-4'>
          <Button variant='destructive' onClick={handleConfigReset}>
            Reset to default
          </Button>
          <Button onClick={handleConfigDetect}>Auto detect</Button>
        </div>
      </section>
      <section>
        <H3>Server info</H3>
        <div className='grid grid-cols-2 gap-2'>
          <div className='flex flex-col'>
            <Muted>Version</Muted>
            <Small>{volStatus?.buildInfo.gitVersion}</Small>
          </div>
          <div className='flex flex-col'>
            <Muted>Commit SHA</Muted>
            <Small>{volStatus?.buildInfo.gitCommit}</Small>
          </div>
          <div className='flex flex-col'>
            <Muted>Platform</Muted>
            <Small>{volStatus?.buildInfo.platform}</Small>
          </div>
          <div className='flex flex-col'>
            <Muted>Build Date</Muted>
            <Small>{volStatus?.buildInfo.buildDate}</Small>
          </div>
          <div className='flex flex-col'>
            <Muted>Go Version</Muted>
            <Small>{volStatus?.buildInfo.goVersion}</Small>
          </div>
          <div className='flex flex-col'>
            <Muted>Compiler</Muted>
            <Small>{volStatus?.buildInfo.compiler}</Small>
          </div>
        </div>
      </section>
    </Layout>
  )
}
