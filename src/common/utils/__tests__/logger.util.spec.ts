import logger from '../logger.util';

describe('logger.util', () => {
  describe('logger', () => {
    it('should log', () => {
      // Given
      const mockedInfo = 'log this!';

      // When
      logger.info(mockedInfo);

      // Then
      expect(logger).toBeDefined();
    });
  });
});
