import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'app'
import { renderWithProviders } from 'test-utils'

describe('<App />', () => {
	it('renders', async () => {
		window.history.pushState({}, 'Home', '/')
		renderWithProviders(<App />, false)

		await expect(screen.findByText('Pulse Remote')).resolves.toBeInTheDocument()

		// Wait for the loading state to disappear
		await waitFor(() =>
			expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument()
		)

		await userEvent.click(screen.getByTestId('goto-input'))

		// Wait for the loading state to disappear
		await waitFor(() =>
			expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument()
		)

		await expect(
			screen.findByText('Output Devices')
		).resolves.toBeInTheDocument()

		await userEvent.click(screen.getByTestId('goto-output'))

		// Wait for the loading state to disappear
		await waitFor(() =>
			expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument()
		)

		await expect(
			screen.findByText('Input Devices')
		).resolves.toBeInTheDocument()
	})
})
