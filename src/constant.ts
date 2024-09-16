export const MIN_VOLUME = 0
/**
 * Max volume 1.5 is 150%. Although you can set it as loud as you like,
 * value above 2.0 (200%) can damage your speakers.
 */
export const MAX_VOLUME = 1.5

export const APP_NAME = 'Pulse Remote'

export const CONTROLLER_OUTPUT_HEAD_TITLE = `${APP_NAME}: Output Devices` as const
export const CONTROLLER_INPUT_HEAD_TITLE = `${APP_NAME}: Input Devices` as const
export const ABOUT_HEAD_NAME = `${APP_NAME}: About` as const

export const dict = {
  appName: 'Pulse Remote',
  headerInput: 'Pulse Remote: Input',
  headerOutput: 'Pulse Remote: Output',
  headerAbout: 'Pulse Remote: About',
  headerConfig: 'Pulse Remote: Config',
} as const

export const testid = {
  gotoOutputDevices: 'goto-output-devices',
  gotoInputDevices: 'goto-input-devices',
  gotoAbout: 'goto-about',
  gotoConfig: 'goto-config',
  btnTheme: 'btn-theme',
  loadingOrError: 'loading-or-error',
} as const
