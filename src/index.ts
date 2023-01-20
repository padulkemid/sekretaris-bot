require('dotenv/config');
import commandService from './command/command.service';
import discordController from './discord/discord.controller';
import { startServer } from './server';

commandService.registerCommands();
discordController.startClient();
startServer();
