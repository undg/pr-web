import { useEffect } from 'react'

interface Properties {
	title: string
}

const projectName = 'Pulse Remote'

export default function Head({ title }: Properties): null {
	useEffect(() => {
		document.title = `${projectName}: ${title}`
	}, [title])

	// eslint-disable-next-line unicorn/no-null
	return null
}
