import type { ReactElement } from 'react'
import { testid } from '../constant'

interface Properties {
  error?: Error
}
export default function LoadingOrError({ error }: Properties): ReactElement {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <h1 className='text-xl' data-testid={testid.loadingOrError}>
        {error ? error.message : 'Loading...'}
      </h1>
    </div>
  )
}
LoadingOrError.defaultProps = {
  error: undefined,
}
