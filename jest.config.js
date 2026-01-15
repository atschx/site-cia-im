/** @type {import('jest').Config} */
module.exports = {
  // 使用 ts-jest 预设处理 TypeScript
  preset: 'ts-jest',
  
  // 测试环境
  testEnvironment: 'jest-environment-jsdom',
  
  // 模块路径别名（与 tsconfig.json 保持一致）
  moduleNameMapper: {
    // 处理 CSS 模块
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // 处理静态资源
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // 路径别名
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // 设置文件
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  
  // 忽略的路径
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.cache/',
    '/public/',
  ],
  
  // 转换配置
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // 不转换的模块
  transformIgnorePatterns: [
    '/node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)',
  ],
  
  // 收集覆盖率的文件
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**/*',
    '!src/**/__tests__/**/*',
  ],
  
  // 覆盖率报告目录
  coverageDirectory: 'coverage',
  
  // 覆盖率报告格式
  coverageReporters: ['text', 'lcov', 'html'],
  
  // 全局变量
  globals: {
    __PATH_PREFIX__: '',
  },
  
  // 模块文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
