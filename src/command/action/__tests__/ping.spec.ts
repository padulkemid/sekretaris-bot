import { ChatInputCommandInteraction } from 'discord.js';

import { ping } from '../ping';

describe('action.ping', () => {
  describe('ping', () => {
    it('should be able to reply pong', async () => {
      // Given
      const expectedResult = 'pong!';
      const mockedInteraction = {
        reply: jest.fn()
      };

      // When
      await ping(mockedInteraction as unknown as ChatInputCommandInteraction);

      // Then
      expect(mockedInteraction.reply).toHaveBeenCalledWith(expectedResult);
    });
  });
});
