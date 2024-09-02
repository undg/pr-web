import Head from 'components/head'
import { ABOUT_HEAD_NAME as ABOUT_HEAD_TITLE } from 'constant'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function About(): ReactElement {
  return (
    <div>
      <Head title={ABOUT_HEAD_TITLE} />
      <Link to='/web/' data-testid='goto-controller'>
        Controller
      </Link>
    </div>
  )
}
