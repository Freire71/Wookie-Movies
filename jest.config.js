module.exports = {
  testEnvironment: 'jsdom',
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@react-native-community|@react-navigation)',
  ],
  setupFilesAfterEnv: [
    './src/config/SetupJest.js',
    '@testing-library/jest-native/extend-expect',
  ],
  collectCoverageFrom: ['./src/**/*.{ts,js,tsx}'],
  testMatch: ['**/__tests__/?(*.)+(test).js'],
};
