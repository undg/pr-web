import LoadingOrError from 'components/loading-or-error'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const OutputDevices = lazy(async () => import('pages/output-devices'))
const InputDevices = lazy(async () => import('pages/input-devices'))

export default function App(): ReactElement {
	return (
		<div>
			<h1>Pulse Remote</h1>
			<BrowserRouter>
				<Suspense fallback={<LoadingOrError />}>
					<Routes>
						<Route path='/' element={<OutputDevices />} />
						<Route path='/web/output' element={<OutputDevices />} />
						<Route path='/web/input' element={<InputDevices />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}
