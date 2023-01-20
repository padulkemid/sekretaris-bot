import { Interaction } from 'discord.js';

import commandService from '../../command/command.service';
import logger from '../../common/utils/logger.util';
import { client } from '../discord.controller';
import discordService from '../discord.service';

jest.mock('../../common/utils/logger.util');
jest.mock('../../command/command.service');
jest.mock('discord.js', () => ({
  ActivityType: {
    Watching: 'watching'
  },
  GatewayIntentBits: {
    Guilds: 1,
    GuildMessages: 512,
    MessageContent: 32768,
    GuildMembers: 2
  },
  Client: jest.fn(() => ({
    user: {
      setPresence: jest.fn()
    }
  }))
}));

describe('discord.service', () => {
  describe('setStatus', () => {
    it('should set presence data', async () => {
      // Given
      (logger.info as jest.Mock).mockReturnValue(true);

      // When
      await discordService.setStatus(client);

      // Then
      expect(client.user?.setPresence).toHaveBeenCalled();
    });
  });

  describe('setInteraction', () => {
    it('should call handle chat input command', async () => {
      // Given
      const mockedInteraction = {
        isChatInputCommand: jest.fn(() => true)
      };

      (
        commandService.handleChatInputCommand as jest.Mock
      ).mockResolvedValueOnce(true);

      // When
      await discordService.setInteraction(
        mockedInteraction as unknown as Interaction
      );

      // Then
      expect(commandService.handleChatInputCommand).toHaveBeenCalledWith(
        mockedInteraction
      );
    });

    it('should not call handle chat input command', async () => {
      // Given
      const mockedInteraction = {
        isChatInputCommand: jest.fn(() => false)
      };

      // When
      await discordService.setInteraction(
        mockedInteraction as unknown as Interaction
      );

      // Then
      expect(commandService.handleChatInputCommand).not.toBeCalled();
    });
  });
});
