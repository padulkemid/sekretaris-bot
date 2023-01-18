import fastify from 'fastify';

import { Server } from './common/constants/server.constant';
import healthController from './health/health.controller';

// `fastify` init
const options = {
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
};

const serverOptions = {
  port: Server.PORT
};

const server = fastify(options);

// Register routes
server.register(healthController);

export const startServer = async () => {
  try {
    await server.listen(serverOptions);
  } catch (e) {
    server.log.error(e);

    process.exit(1);
  }
};
