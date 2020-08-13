module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupTest.ts'],
  globals: {
    testHost: 'http://localhost:4000/graphql',
  },
};
