import fs from 'fs';
import path from 'path';

import {
  ChatInputCommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder
} from 'discord.js';
import YAML from 'yaml';

import { Envvar } from '../common/constants/envvar.constant';
import logger from '../common/utils/logger.util';

import action from './action';
import { ICommand } from './command.interface';
import commandValidator from './command.validator';

const retrieveCommands = (): ICommand[] => {
  const commandsPath = path.resolve(__dirname, '../../configs/commands.yaml');
  const commandsFile = fs.readFileSync(commandsPath, 'utf-8');
  const parsed = YAML.parse(commandsFile);

  const { error: validationError, value: commands } =
    commandValidator.commonCommandValidator.validate(parsed.commands);

  if (validationError) throw validationError;

  return commands;
};

const registerCommands = async (): Promise<void> => {
  const commands = retrieveCommands().map((command) => {
    const buildCommand = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);

    return buildCommand.toJSON();
  });

  await new REST()
    .setToken(Envvar.DISCORD_BOT_TOKEN)
    .put(Routes.applicationCommands(Envvar.DISCORD_CLIENT_ID), {
      body: commands
    });

  logger.info('Commands are successfully registered!');
};

const handleChatInputCommand = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  try {
    logger.info(`Processing: ${interaction.commandName}`);

    await action[interaction.commandName](interaction);
  } catch (error) {
    logger.error(error);

    await interaction.followUp(`Error thrown: ${error}`);
  }
};

const commandService = {
  retrieveCommands,
  registerCommands,
  handleChatInputCommand
};

export default commandService;
