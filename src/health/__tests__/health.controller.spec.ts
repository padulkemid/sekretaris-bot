import fastify from 'fastify';
import { Http } from '../../common/http.constant';
import healthController from '../health.controller';
import healthService from '../health.service';
import { buildMockedPingResponse } from '../__mocks__/health.data';

jest.mock('../health.service');

describe('health.controller', () => {
  let server: any;

  beforeAll(() => {
    server = fastify();
    server.register(healthController);
  });

  describe('GET /ping', () => {
    it('should return pong! from health.service', async () => {
      // Given
      const mockedData = buildMockedPingResponse();

      (healthService.ping as jest.Mock).mockReturnValueOnce(mockedData);

      // When
      const response = await server.inject({
        method: Http.Method.GET,
        url: '/ping'
      });

      // Then
      expect(response.statusCode).toEqual(Http.StatusCode.OK);
      expect(healthService.ping).toBeCalled();
    });
  });
});
