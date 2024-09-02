import Head from 'components/head'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const pageTitle = 'Output Devices'
export default function OutputDevices(): ReactElement {
	return (
		<>
			<Head title={pageTitle} />
			<div>
				<h2>{pageTitle}</h2>
				<Link to='/web/input' data-testid='goto-input'>
					Input Devices
				</Link>
			</div>
		</>
	)
}
