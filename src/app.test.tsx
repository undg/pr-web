import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'app'
import { ABOUT_HEAD_NAME, CONTROLLER_OUTPUT_HEAD_TITLE } from 'constant'
import { renderWithProviders } from 'test-utils'

describe('<App />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/')
    renderWithProviders(<App />, false)

    /**
     * Wait for the loading state to disappear.
     * In case of a failing test in the next step,
     * I want to stdout the actual page, instead of the "...loading" thingy.
     */
    const waitForLoad = async () => {
      const timeout = 5000
      await waitFor(() => expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument(), { timeout })
    }

    await expect(screen.findByText(CONTROLLER_OUTPUT_HEAD_TITLE)).resolves.toBeInTheDocument()

    await waitForLoad()

    await userEvent.click(screen.getByTestId('goto-about'))

    await waitForLoad()

    await expect(screen.findByText(ABOUT_HEAD_NAME)).resolves.toBeInTheDocument()

    await userEvent.click(screen.getByTestId('goto-output-devices'))

    await waitForLoad()

    await expect(screen.findByText(CONTROLLER_OUTPUT_HEAD_TITLE)).resolves.toBeInTheDocument()
  })
})
