import { Fragment, useCallback } from 'react'
import { useVolStatus } from '../api/use-vol-status'
import { useWebSocketApi } from '../api/use-web-socket-api'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../constant'

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
          <VolumeSlider
            key={output.id}
            muted={output.muted}
            volume={output.volume}
            label={output.label}
            onMuteChange={handleMuteToggle(output.name)}
            onValueChange={handleVolumeChange(output.name)}
          >
            {volStatus.apps.map(
              app =>
                app.outputId === output.id && (
                  <Fragment key={app.id}>
                    <div className='relative ml-4 flex h-full items-end justify-end'>
                      <span className='absolute bottom-1 h-full w-full border border-b-foreground border-l-foreground' />
                    </div>
                    <VolumeSlider
                      muted={app.muted}
                      label={app.label}
                      volume={app.volume}
                      onMuteChange={() => {}}
                      onValueChange={() => {}}
                    />
                  </Fragment>
                ),
            )}
          </VolumeSlider>
        ))}
      </section>
    </Layout>
  )
}

// @TODO (undg) 2024-09-14: Implemet Input controller
export const ControllerInput = ControllerOutput
