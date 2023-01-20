export const buildDiscordMockFunctions = () => ({
  GatewayIntentBits: {
    Guilds: 1
  },
  Events: {
    ClientReady: 'ready'
  },
  Client: jest.fn(() => ({
    on: jest.fn(),
    once: jest.fn(),
    login: jest.fn()
  }))
});
