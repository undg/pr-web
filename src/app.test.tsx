import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './app'
import { dict, testid } from './constant'
import { renderWithProviders } from './test-utils'

describe('<App />', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Home', '/')
    renderWithProviders(<App />, false)
  })

  const waitForLoad = async () => {
    await waitFor(() => expect(screen.queryByTestId('loading-or-error')).not.toBeInTheDocument(), { timeout: 5000 })
  }

  test.each([
    [
      'load home page',
      async () => {
        await waitForLoad()
        await expect(screen.findByText(dict.headerOutput)).resolves.toBeInTheDocument()
      },
    ],
    [
      'go to about',
      async () => {
        await userEvent.click(screen.getByTestId(testid.gotoAbout))
        await waitForLoad()
        await expect(screen.findByText(dict.headerAbout)).resolves.toBeInTheDocument()
      },
    ],
    [
      'go to config',
      async () => {
        await userEvent.click(screen.getByTestId(testid.gotoConfig))
        await waitForLoad()
        await expect(screen.findByText(dict.headerConfig)).resolves.toBeInTheDocument()
      },
    ],
    [
      'go to output devices',
      async () => {
        await userEvent.click(screen.getByTestId(testid.gotoOutputDevices))
        await waitForLoad()
        await expect(screen.findByText(dict.headerOutput)).resolves.toBeInTheDocument()
      },
    ],
  ])('%s', async (_, test) => await test())
})
