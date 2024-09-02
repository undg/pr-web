import Head from 'components/head'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'components/button'
import { Slider } from 'components/slider'
import { MIN_VOLUME, MAX_VOLUME, CONTROLLER_HEAD_TITLE } from 'constant'

export default function Controller(): ReactElement {
  return (
    <div>
      <Head title={CONTROLLER_HEAD_TITLE} />
      <Link to='/web/about' data-testid='goto-about'>
        <Button>About</Button>
      </Link>
      <Slider title='Volume' min={MIN_VOLUME} max={MAX_VOLUME} />
    </div>
  )
}
