export const APP_NAME = 'Pulse Remote'

export const CONTROLLER_HEAD_TITLE = `${APP_NAME}: Controller` as const
export const ABOUT_HEAD_NAME = `${APP_NAME}: About` as const

export const MIN_VOLUME = 0
/**
 * Max volume 1.5 is 150%. Although you can set it as loud as you like,
 * value above 2.0 (200%) can damage your speakers.
 */
export const MAX_VOLUME = 1.5

// @TODO (undg) 2024-09-12: move it to config
export const WEBSOCKET_URL = 'ws://localhost:8448/api/v1/ws'
