import { ChatInputCommandInteraction } from 'discord.js';

import { ping } from './ping';

const action: Record<
  string,
  (interaction: ChatInputCommandInteraction) => Promise<void>
> = {
  ping
};

export default action;
