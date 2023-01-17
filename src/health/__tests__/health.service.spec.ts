import healthService from '../health.service';
import { buildMockedPingResponse } from '../__mocks__/health.data';

describe('health.service', () => {
  describe('ping', () => {
    it('should return pong!', () => {
      // Given
      const expectedResult = buildMockedPingResponse();

      // When
      const result = healthService.ping();

      // Then
      expect(result).toStrictEqual(expectedResult);
    });
  });
});
