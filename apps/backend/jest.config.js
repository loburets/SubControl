module.exports = {
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@prisma/client$': '<rootDir>/../../node_modules/@prisma/client',
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/app.module.ts',
    '!src/main.ts',
    '!src/config/**/**.**',
    '!src/utils/swagger.ts',
    '!src/utils/exceptionsFilter.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
