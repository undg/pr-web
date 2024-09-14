import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { Settings, Info, Volume2, Mic } from 'lucide-react'

export const TopNav: FC = () => (
  <nav className='mb-8 flex justify-between gap-4'>
    <div className='flex justify-between gap-4'>
      <Link to='/' data-testid='goto-output-devices'>
        <Button variant='default'>
          <Volume2 />
        </Button>
      </Link>
      <Link to='/input' data-testid='goto-input-devices'>
        <Button variant='default'>
          <Mic />
        </Button>
      </Link>
    </div>

    <div className='flex justify-between gap-4'>
      <Link to='/about' data-testid='goto-about'>
        <Button variant='outline'>
          <Info />
        </Button>
      </Link>
      <Link to='/config' data-testid='goto-config'>
        <Button variant='outline'>
          <Settings />
        </Button>
      </Link>
    </div>
  </nav>
)
