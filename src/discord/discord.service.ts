import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  PresenceData
} from 'discord.js';

import { Envvar } from '../common/constants/envvar.constant';
import logger from '../common/utils/logger.util';

export const startClient = async (): Promise<void> => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  client.once(Events.ClientReady, (bot) => {
    logger.info(`Logged in as ${bot.user.tag}`);
  });

  client.on(Events.ClientReady, (bot) => {
    const presenceData = {
      activities: [
        {
          name: 'JoinDong',
          type: ActivityType.Watching
        }
      ],
      status: 'online'
    } satisfies PresenceData;

    bot.user.setPresence(presenceData);
  });

  client.login(Envvar.DISCORD_BOT_TOKEN);
};
