module.exports = {
  moduleNameMapper: {
    '@(actions|components|sagas|state|utils|views)/(.*)$': '<rootDir>/src/$1/$2',
  },
  setupFiles: [
    '<rootDir>/jest/dialog-polyfill.mock.js'
  ]
}