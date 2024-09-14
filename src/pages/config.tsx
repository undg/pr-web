import Head from 'components/head'
import { TopNav } from 'components/top-nav'
import { dict } from 'constant'
import type { FC } from 'react'

export const Config: FC = () => {
  return (
    <div>
      <Head title={dict.headerConfig} />
      <TopNav />
      <div>Config</div>
    </div>
  )
}
