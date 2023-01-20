import { ActivityType, Client, PresenceData } from 'discord.js';

import logger from '../common/utils/logger.util';

const setStatus = (client: Client<true>): void => {
  const presenceData = {
    activities: [
      {
        name: 'JoinDong',
        type: ActivityType.Watching
      }
    ],
    status: 'online'
  } satisfies PresenceData;

  client.user.setPresence(presenceData);
  logger.info(presenceData, 'Successfully set discord presence data!');
};

const discordService = {
  setStatus
};

export default discordService;
