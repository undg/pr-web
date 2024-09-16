import { Button } from 'components/button'
import { Layout } from 'components/layout'
import { H3, P } from 'components/typography'
import { defaultConfig, useConfig } from 'config/use-config'
import { dict } from 'constant'
import { Input } from 'primitives/input'
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
    </Layout>
  )
}
