import { Client, Events, GatewayIntentBits } from 'discord.js';

import { Envvar } from '../common/constants/envvar.constant';

import discordService from './discord.service';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const startClient = async (): Promise<void> => {
  client.on(Events.ClientReady, discordService.setStatus);
  client.on(Events.InteractionCreate, discordService.setInteraction);
  client.login(Envvar.DISCORD_BOT_TOKEN);
};

const discordController = {
  startClient
};

export default discordController;
