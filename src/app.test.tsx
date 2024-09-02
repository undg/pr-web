import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'app'
import { ABOUT_HEAD_NAME, CONTROLLER_HEAD_TITLE } from 'constant'
import { renderWithProviders } from 'test-utils'

describe('<App />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/')
    renderWithProviders(<App />, false)

    await expect(screen.findByText(CONTROLLER_HEAD_TITLE)).resolves.toBeInTheDocument()

    // Wait for the loading state to disappear
    // await waitFor(() => expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument())

    await userEvent.click(screen.getByTestId('goto-about'))

    // Wait for the loading state to disappear
    // await waitFor(() => expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument())

    await expect(screen.findByText(ABOUT_HEAD_NAME)).resolves.toBeInTheDocument()

    await userEvent.click(screen.getByTestId('goto-controller'))

    // Wait for the loading state to disappear
    // await waitFor(() => expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument())

    await expect(screen.findByText(CONTROLLER_HEAD_TITLE)).resolves.toBeInTheDocument()
  })
})
