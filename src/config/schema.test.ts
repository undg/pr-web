import { ConfigSchema } from './schema'

describe('ConfigSchema', () => {
  it('should be valid config', () => {
    const validConfig = {
      hostname: 'localhost',
      port: '8448',
      endpoint: '/api/v1/ws',
    }
    expect(ConfigSchema.parse(validConfig).serverUrl).toEqual('ws://localhost:8448/api/v1/ws')
  })

  it('should parse serverUrl', () => {
    const validConfig = {
      hostname: 'localhost',
      port: '8448',
      endpoint: '/api/v1/ws',
    }
    expect(ConfigSchema.parse(validConfig).serverUrl).toEqual('ws://localhost:8448/api/v1/ws')
  })

  describe(`hostname`, () => {
    it('should throw with invalid endpoint', () => {
      const invalidConfig = {
        hostname: 'localhost',
        port: '8448',
        endpoint: 'api/v1/ws',
        serverUrl: 'ws://localhost:8448/api/v1/ws',
      }
      expect(() => ConfigSchema.parse(invalidConfig)).toThrow()
    })
  })
  describe(`Port`, () => {
    it('should pass with empty port', () => {
      const invalidConfig = {
        hostname: 'localhost',
        endpoint: '/api/v1/ws',
        serverUrl: 'ws://localhost:8448/api/v1/ws',
      }
      expect(ConfigSchema.parse(invalidConfig).port).toEqual(undefined)
    })

    it('should throw with invalid port that is to low', () => {
      const invalidConfig = {
        hostname: 'localhost',
        port: '-1',
        endpoint: '/api/v1/ws',
        serverUrl: 'ws://localhost:8448/api/v1/ws',
      }
      expect(() => ConfigSchema.parse(invalidConfig)).toThrow()
    })

    it('should throw with invalid port that is to high', () => {
      const invalidConfig = {
        hostname: 'localhost',
        port: '70000',
        endpoint: '/api/v1/ws',
        serverUrl: 'ws://localhost:8448/api/v1/ws',
      }
      expect(() => ConfigSchema.parse(invalidConfig)).toThrow()
    })
  })

  describe(`Endpoint`, () => {
    it('should throw with invalid endpoint', () => {
      const invalidConfig = {
        hostname: 'localhost',
        port: '8448',
        endpoint: 'api/v1/ws',
        serverUrl: 'ws://localhost:8448/api/v1/ws',
      }
      expect(() => ConfigSchema.parse(invalidConfig)).toThrow()
    })
  })
})
