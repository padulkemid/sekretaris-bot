import { ChatInputCommandInteraction } from 'discord.js';

export const ping = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  await interaction.reply('pong!');
};
