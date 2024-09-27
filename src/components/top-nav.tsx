import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './button'
import { Settings, Info, Volume2, Mic, Sun, Moon } from 'lucide-react'
import { useTheme } from '../config/use-theme'
import { testid } from '../constant'

export const TopNav: FC = () => {
  const [theme, setTheme] = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className='mb-8 flex justify-between gap-4'>
      <div className='flex justify-between gap-4'>
        <Link to='/' data-testid={testid.gotoOutputDevices}>
          <Button variant='outline'>
            <Volume2 />
          </Button>
        </Link>
        <Link to='/input' data-testid={testid.gotoInputDevices}>
          <Button variant='outline'>
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
        <Button variant='outline' data-testid={testid.btnTheme} onClick={handleThemeToggle}>
          {theme === 'light' && <Sun />}
          {theme === 'dark' && <Moon />}
        </Button>
      </div>
    </nav>
  )
}
