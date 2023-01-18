require('dotenv/config');
import { startClient } from './discord/discord.service';
import { startServer } from './server';

startServer();
startClient();
