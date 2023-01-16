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
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/$1'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 90,
      statements: 90
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js,tsx,jsx}',
    '!src/**/*.(interface|constant|constants|type|validator|enum).{ts,js,tsx,jsx}',
    '!src/index.tsx',
    '!**/__mocks__/**',
    '!**/node_modules/**'
  ],
  clearMocks: true,
  testRunner: 'jest-jasmine2',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura', 'lcov'],
  modulePathIgnorePatterns: ['.*__mocks__.*']
};
