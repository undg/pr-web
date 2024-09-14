import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { Settings, Info, Volume2, Mic } from 'lucide-react'
import { testid } from 'constant'

export const TopNav: FC = () => (
  <nav className='mb-8 flex justify-between gap-4'>
    <div className='flex justify-between gap-4'>
      <Link to='/' data-testid={testid.gotoOutputDevices}>
        <Button variant='default'>
          <Volume2 />
        </Button>
      </Link>
      <Link to='/input' data-testid={testid.gotoInputDevices}>
        <Button variant='default'>
          <Mic />
        </Button>
      </Link>
    </div>

    <div className='flex justify-between gap-4'>
      <Link to='/about' data-testid={testid.gotoAbout}>
        <Button variant='outline'>
          <Info />
        </Button>
      </Link>
      <Link to='/config' data-testid={testid.gotoConfig}>
        <Button variant='outline'>
          <Settings />
        </Button>
      </Link>
    </div>
  </nav>
)
