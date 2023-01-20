import { ActivityType, Client, Interaction, PresenceData } from 'discord.js';

import commandService from '../command/command.service';
import logger from '../common/utils/logger.util';

import { ServerName } from './discord.enum';

const setStatus = async (client: Client<true>): Promise<void> => {
  const presenceData = {
    activities: [
      {
        name: ServerName.JOIN_DONG,
        type: ActivityType.Watching
      }
    ],
    status: 'online'
  } satisfies PresenceData;

  client.user.setPresence(presenceData);
  logger.info('Successfully set discord presence data!');
};

const setInteraction = async (interaction: Interaction): Promise<void> => {
  if (!interaction.isChatInputCommand()) return;

  await commandService.handleChatInputCommand(interaction);
};

const discordService = {
  setStatus,
  setInteraction
};

export default discordService;
