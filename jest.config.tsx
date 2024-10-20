module.exports = {
    roots: ['<rootDir>/components'],
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleDirectories: ['node_modules', 'components'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };