import { useTheme } from 'config/use-theme'
import type { FC, PropsWithChildren } from 'react'
import { cn } from 'utils/cn'
import { TopNav } from './top-nav'
import { H1 } from './typography'

export const Layout: FC<PropsWithChildren<{ header?: string }>> = props => {
  const [theme] = useTheme()
  return (
    <div
      className={cn(
        //
        'flex h-full min-h-screen w-full justify-center bg-background text-foreground',
        theme === 'dark' && 'dark',
        theme === 'light' && 'light',
      )}
    >
      <div className='w-full max-w-screen-lg bg-muted p-8 pt-12 '>
        <H1>{props.header ?? ''}</H1>
        <TopNav />
        <main>{props.children}</main>
      </div>
    </div>
  )
}
