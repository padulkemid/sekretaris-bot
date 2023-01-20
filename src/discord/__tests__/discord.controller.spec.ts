import { Events } from 'discord.js';

import { client, startClient } from '../discord.controller';
import discordService from '../discord.service';

jest.mock('../discord.service');
jest.mock('discord.js', () => ({
  GatewayIntentBits: {
    Guilds: 1
  },
  Events: {
    ClientReady: 'ready'
  },
  Client: jest.fn(() => ({
    on: jest.fn(),
    login: jest.fn()
  }))
}));

describe('discord.controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('startClient', () => {
    it('should start client and then login', async () => {
      // When
      await startClient();

      // Then
      expect(client.on).toHaveBeenCalledWith(
        Events.ClientReady,
        discordService.setStatus
      );
      expect(client.login).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
