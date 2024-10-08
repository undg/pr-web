import { Volume, VolumeOff } from 'lucide-react'
import { MAX_VOLUME, MIN_VOLUME, testid } from '../constant'
import { cn } from '../utils/cn'
import { Slider } from '../primitives/slider'
import { Toggle } from '../primitives/toggle'
import { Small } from '../primitives/typography'

export const VolumeSlider: React.FC<{
  children?: React.ReactNode
  className?: string
  muted: boolean
  label: string
  volume: string
  onMuteChange?: React.MouseEventHandler<HTMLButtonElement> | undefined
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
}> = props => {
  return (
    <div
      className={cn('grid items-center gap-x-4 gap-y-0', props.className)}
      style={{ gridTemplateColumns: '2em auto', gridTemplateRows: 'repeat(1em)' }}
    >
      <Toggle
        variant='outline'
        size='sm'
        pressed={props.muted}
        data-testid={testid.btnMuteToggle}
        onClick={props.onMuteChange}
      >
        {props.muted ? <VolumeOff color='red' /> : <Volume />}
      </Toggle>
      <Small className='self-end truncate text-right text-xs'>{props.label}</Small>
      <div
        className={cn(
          'text-green-500',
          Number(props.volume) >= 75 && 'text-orange-500',
          Number(props.volume) >= 100 && 'text-red-500',
        )}
      >
        {props.volume}%
      </div>
      <Slider
        className='top-2 col-span-1 mb-4'
        name={props.label}
        title={props.label}
        min={MIN_VOLUME}
        max={MAX_VOLUME}
        value={[Number(props.volume)]}
        step={1}
        onValueChange={props.onValueChange}
        onValueCommit={props.onValueCommit}
      />
      {props.children}
    </div>
  )
}
