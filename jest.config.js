module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
    '^.+\\.(t|j)s?$': ['@swc/jest']
  },
  preset: 'ts-jest',
  testMatch: ['**/?(*.)(spec|test).tsx', '**/?(*.)(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js,tsx,jsx}',
    '!src/**/*.(interface|constant|constants|type|validator|enum).{ts,js,tsx,jsx}',
    '!src/index.ts',
    '!src/server.ts',
    '!**/__mocks__/**',
    '!**/node_modules/**'
  ],
  clearMocks: true,
  testRunner: 'jest-jasmine2',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura', 'lcov'],
  modulePathIgnorePatterns: ['.*__mocks__.*']
};
