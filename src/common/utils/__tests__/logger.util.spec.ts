import logger from '../logger.util';

describe('logger.util', () => {
  describe('logger', () => {
    it('should log', () => {
      // Given
      const spyLog = jest.spyOn(logger, 'info');
      const mockedInfo = 'log this!';

      // When
      logger.info(mockedInfo);

      // Then
      expect(logger).toBeDefined();
      expect(spyLog).toHaveBeenCalled();
    });
  });
});
