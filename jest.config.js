module.exports = {
  moduleNameMapper: {
    '@(components|state|utils|views)/(.*)$': '<rootDir>/src/$1/$2',
  },
  setupFiles: [
    '<rootDir>/jest/dialog-polyfill.mock.js'
  ]
}