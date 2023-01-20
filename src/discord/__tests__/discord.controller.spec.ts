import { Events } from 'discord.js';

import discordController, { client } from '../discord.controller';
import discordService from '../discord.service';

jest.mock('../discord.service');
jest.mock('discord.js', () => ({
  GatewayIntentBits: {
    Guilds: 1,
    GuildMessages: 512,
    MessageContent: 32768,
    GuildMembers: 2
  },
  Events: {
    ClientReady: 'ready',
    InteractionCreate: 'interactionCreate'
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
      await discordController.startClient();

      // Then
      expect(client.on).toHaveBeenNthCalledWith(
        1,
        Events.ClientReady,
        discordService.setStatus
      );
      expect(client.on).toHaveBeenNthCalledWith(
        2,
        Events.InteractionCreate,
        discordService.setInteraction
      );
      expect(client.on).toHaveBeenCalledTimes(2);
      expect(client.login).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
