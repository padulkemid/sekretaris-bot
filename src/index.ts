require('dotenv/config');
import { startClient } from './discord/discord.controller';
import { startServer } from './server';

startServer();
startClient();
