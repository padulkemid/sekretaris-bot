import {
  ChatInputCommandInteraction,
  REST,
  SlashCommandBuilder
} from 'discord.js';

import logger from '../../common/utils/logger.util';
import action from '../action';
import commandService from '../command.service';
import commandValidator from '../command.validator';

jest.mock('../action');
jest.mock('../command.validator');
jest.mock('../../common/utils/logger.util');
jest.mock('discord.js', () => ({
  SlashCommandBuilder: jest.fn(() => ({
    setName: jest.fn(() => ({
      setDescription: jest.fn(() => ({
        toJSON: jest.fn()
      }))
    }))
  })),
  REST: jest.fn(() => ({
    setToken: jest.fn(() => ({
      put: jest.fn()
    }))
  })),
  Routes: {
    applicationCommands: jest.fn()
  }
}));

describe('command.service', () => {
  const mockedValidateResponse = {
    error: false,
    value: [
      {
        name: 'ping',
        description: 'ping'
      }
    ]
  };

  describe('retrieveCommands', () => {
    it('should be able to retrieve commands', () => {
      // Given
      (
        commandValidator.commonCommandValidator.validate as jest.Mock
      ).mockReturnValueOnce(mockedValidateResponse);

      // When
      const result = commandService.retrieveCommands();

      // Then
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('should throw error because validation did not pass', () => {
      // Given
      (
        commandValidator.commonCommandValidator.validate as jest.Mock
      ).mockReturnValueOnce({ ...mockedValidateResponse, error: true });

      // When & Then
      expect(commandService.retrieveCommands).toThrow();
    });
  });

  describe('registerCommands', () => {
    it('should be able to register commands', async () => {
      // Given
      (
        commandValidator.commonCommandValidator.validate as jest.Mock
      ).mockReturnValueOnce(mockedValidateResponse);
      (logger.info as jest.Mock).mockReturnValueOnce(true);

      // When
      await commandService.registerCommands();

      // Then
      expect(SlashCommandBuilder).toBeCalled();
      expect(REST).toBeCalled();
      expect(logger.info).toBeCalled();
    });
  });

  describe('handleChatInputCommand', () => {
    it('should handle chat input command', async () => {
      // Given
      const mockedInteraction = {
        commandName: 'ping'
      };

      (logger.info as jest.Mock).mockReturnValueOnce(true);
      (action.ping as jest.Mock).mockResolvedValueOnce(true);

      // When
      await commandService.handleChatInputCommand(
        mockedInteraction as unknown as ChatInputCommandInteraction
      );

      // Then
      expect(action.ping).toHaveBeenCalled();
    });

    it('should throw error if action throws', async () => {
      // Given
      const mockedInteraction = {
        commandName: 'ping',
        followUp: jest.fn()
      };

      (logger.info as jest.Mock).mockReturnValueOnce(true);
      (logger.error as jest.Mock).mockReturnValueOnce(true);
      (action.ping as jest.Mock).mockRejectedValueOnce(false);

      // When
      await commandService.handleChatInputCommand(
        mockedInteraction as unknown as ChatInputCommandInteraction
      );

      // Then
      expect(logger.error).toHaveBeenCalled();
      expect(mockedInteraction.followUp).toHaveBeenCalled();
    });
  });
});
