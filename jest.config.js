/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // 意思是使用ts-jest来处理测试
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
};