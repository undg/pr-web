import { z } from 'zod'

// @TODO (undg) 2024-09-15: I need  two schemas. One for throwing errors, second for UI errors.

export const ConfigSchema = z
  .object({
    hostname: z.string().describe('Server host address').optional(),
    port: z
      .string()
      .regex(/^\d+$/, { message: 'Port must be a number' })
      .refine(
        val => {
          const num = parseInt(val, 10)
          return num >= 1 && num <= 65535
        },
        { message: 'Port must be between 1 and 65535' },
      )
      .optional()
      .describe('Valid port between 1 and 65535'),
    endpoint: z.string().startsWith('/').describe('API endpoint path starting with /'),
    serverUrl: z.string().optional().describe('Full server URL. Do not edit directly.'),
  })
  .transform(({ hostname, port, endpoint }) => ({
    /** Host address for the server */
    hostname,
    /** Port number for the server */
    port,
    /** API endpoint path */
    endpoint,
    /** Full server URL. Automatically generated. Do not edit directly. */
    serverUrl: `ws://${hostname}:${port}${endpoint}`,
  }))

export type Config = z.infer<typeof ConfigSchema>
