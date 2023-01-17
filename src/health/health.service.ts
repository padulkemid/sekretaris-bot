import { IResponse } from './health.interface';

const ping = (): IResponse<string> => ({
  data: 'pong!'
});

const healthService = {
  ping
};

export default healthService;
