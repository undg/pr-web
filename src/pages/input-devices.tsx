import Head from 'components/head'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const pageTitle = 'Input Devices'
export default function InputDevices(): ReactElement {
	return (
		<>
			<Head title={pageTitle} />
			<div>
				<h2>{pageTitle}</h2>
				<Link to='/web/output' data-testid='goto-output'>
					Output Devices
				</Link>
			</div>
		</>
	)
}
