import { IResponse } from '../health.interface';

export const buildMockedPingResponse = (): IResponse<string> => ({
  data: 'pong!'
});
