import LoadingOrError from 'components/loading-or-error'
import About from 'pages/about'
import Controller from 'pages/controller'
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App(): ReactElement {
  return (
    <div className='flex w-full justify-center'>
      <div className='w-full max-w-screen-sm bg-gray-50'>
        <BrowserRouter>
          <Suspense fallback={<LoadingOrError />}>
            <Routes>
              <Route path='/' element={<Controller />} />
              <Route path='/web/' element={<Controller />} />
              <Route path='/web/about' element={<About />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </div>
  )
}
