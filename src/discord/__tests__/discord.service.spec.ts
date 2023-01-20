import logger from '../../common/utils/logger.util';
import { client } from '../discord.controller';
import discordService from '../discord.service';

jest.mock('../../common/utils/logger.util');
jest.mock('discord.js', () => ({
  ActivityType: {
    Watching: 'watching'
  },
  GatewayIntentBits: {
    Guilds: 1
  },
  Client: jest.fn(() => ({
    user: {
      setPresence: jest.fn()
    }
  }))
}));

describe('discord.service', () => {
  describe('setStatus', () => {
    it('should set presence data', () => {
      // Given
      (logger.info as jest.Mock).mockReturnValue(true);

      // When
      discordService.setStatus(client);

      // Then
      expect(client.user?.setPresence).toHaveBeenCalled();
    });
  });
});
