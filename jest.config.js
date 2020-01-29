module.exports = {
  moduleNameMapper: {
    '@(actions|components|sagas|state|utils|views)/(.*)$': '<rootDir>/src/$1/$2',
    '@test/(.*)$': '<rootDir>/test/$1',
  },
  setupFiles: [
    '<rootDir>/test/dialog-polyfill.mock.ts'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/import-enzyme.ts',
  ],
  testEnvironment: 'enzyme'
}