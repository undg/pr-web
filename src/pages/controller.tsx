import { Fragment, useCallback } from 'react'
import { useVolumeStatus } from '../api/use-vol-status'
import { useWebSocketApi } from '../api/use-web-socket-api'
import { Layout } from '../components/layout'
import { VolumeSlider } from '../components/volume-slider'
import { dict } from '../constant'

export const ControllerOutput: React.FC = () => {
  const { volStatus, updateVolStatus } = useVolumeStatus()
  const { sendMessage } = useWebSocketApi()

  const handleSinkVolumeChange = useCallback(
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

  const handleSinkMuteToggle = useCallback(
    (name: string) => () => {
      updateVolStatus(draft => {
        const output = draft?.outputs.find(o => o.name === name)
        if (output) {
          output.muted = !output.muted

          sendMessage({
            action: 'SetSinkMuted',
            payload: { name: output.name, muted: output.muted },
          })
        }
      })

      navigator.vibrate([10])
    },
    [updateVolStatus, sendMessage],
  )

  const handleSinkInputVolumeChange = useCallback(
    (id: number) => (newValue: number[]) => {
      updateVolStatus(draft => {
        const output = draft?.apps.find(o => o.id === id)
        if (output) {
          output.volume = newValue[0].toString()
        }
      })
      navigator.vibrate([10])
    },
    [updateVolStatus],
  )

  const handleSinkInputMuteToggle = useCallback(
    (id: number) => () => {
      updateVolStatus(draft => {
        const app = draft?.apps.find(o => o.id === id)
        if (app) {
          app.muted = !app.muted

          sendMessage({
            action: 'SetSinkInputMuted',
            payload: { id: app.id, muted: app.muted },
          })
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
            onMuteChange={handleSinkMuteToggle(output.name)}
            onValueChange={handleSinkVolumeChange(output.name)}
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
                      onMuteChange={handleSinkInputMuteToggle(app.id)}
                      onValueChange={handleSinkInputVolumeChange(app.id)}
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
