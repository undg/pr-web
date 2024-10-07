import { ArrowRight, Volume, VolumeOff } from 'lucide-react'
import { Fragment, useCallback } from 'react'
import { useVolStatus } from '../api/use-vol-status'
import { useWebSocketApi } from '../api/use-web-socket-api'
import { Layout } from '../components/layout'
import { Slider } from '../components/slider'
import { Toggle } from '../components/toggle'
import { Small } from '../components/typography'
import { dict, MAX_VOLUME, MIN_VOLUME, testid } from '../constant'
import { cn } from '../utils/cn'

export const ControllerOutput: React.FC = () => {
  const { volStatus, updateVolStatus } = useVolStatus()
  const { sendMessage } = useWebSocketApi()

  const handleVolumeChange = useCallback(
    (name: string) => (newValue: number[]) => {
      updateVolStatus(draft => {
        const output = draft?.outputs.find(o => o.name === name)
        if (output) {
          output.volume = newValue[0].toString()
        }
      })
      navigator.vibrate([10])
    },
    [updateVolStatus],
  )

  const handleMuteToggle = useCallback(
    (name: string) => () => {
      updateVolStatus(draft => {
        const output = draft?.outputs.find(o => o.name === name)
        if (output) {
          output.muted = !output.muted

          sendMessage(
            JSON.stringify({
              action: 'SetMuted',
              payload: { name: output.name, muted: output.muted },
            }),
          )
        }
      })

      navigator.vibrate([10])
    },
    [updateVolStatus, sendMessage],
  )

  return (
    <Layout header={dict.headerOutput}>
      <section className='flex flex-col gap-6 text-xl'>
        {volStatus?.outputs.map(output => (
          <div
            key={output.name}
            className='grid items-center gap-x-4 gap-y-1'
            style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
          >
            <Toggle
              variant='outline'
              size='sm'
              pressed={output.muted}
              data-testid={testid.btnMuteToggle}
              onClick={handleMuteToggle(output.name)}
            >
              {output.muted ? <VolumeOff color='red' /> : <Volume />}
            </Toggle>
            <Small className='self-end truncate text-right text-xs'>{output.label}</Small>
            <div
              className={cn(
                'text-green-500',
                Number(output.volume) >= 75 && 'text-orange-500',
                Number(output.volume) >= 100 && 'text-red-500',
              )}
            >
              {output.volume}%
            </div>
            <Slider
              className='top-2 col-span-1 mb-4'
              name={output.label}
              title={output.label}
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              value={[Number(output.volume)]}
              step={1}
              onValueChange={handleVolumeChange(output.name)}
            />
            {volStatus.apps.map(
              app =>
                app.outputId === output.id && (
                  <Fragment key={app.id}>
                    <div className='ml-4 flex h-full items-end justify-end border border-b-foreground border-l-foreground'>
                      <ArrowRight />
                    </div>
                    <div
                      className='grid items-center gap-x-4 gap-y-1'
                      style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
                    >
                      <Toggle variant='outline' size='sm' pressed={app.muted} data-testid={testid.btnMuteToggle}>
                        {app.muted ? <VolumeOff color='red' /> : <Volume />}
                      </Toggle>
                      <Small className='self-end truncate text-right text-xs'>{app.label}</Small>
                      <div
                        className={cn(
                          'text-green-500',
                          Number(app.volume) >= 75 && 'text-orange-500',
                          Number(app.volume) >= 100 && 'text-red-500',
                        )}
                      >
                        {app.volume}%
                      </div>
                      <Slider
                        className='top-2 col-span-1 mb-4'
                        name={app.label}
                        title={app.label}
                        min={MIN_VOLUME}
                        max={MAX_VOLUME}
                        value={[Number(app.volume)]}
                        step={1}
                      />
                    </div>
                  </Fragment>
                ),
            )}
          </div>
        ))}
      </section>
    </Layout>
  )
}

// @TODO (undg) 2024-09-14: Implemet Input controller
export const ControllerInput = ControllerOutput
