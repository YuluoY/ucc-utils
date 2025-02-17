# UCC-Utils

[![npm version](https://img.shields.io/npm/v/ucc-utils.svg)](https://www.npmjs.com/package/ucc-utils)
[![License](https://img.shields.io/npm/l/ucc-utils.svg)](https://github.com/YuluoY/ucc-utils/blob/main/LICENSE)

一个现代化的 JavaScript/TypeScript 工具库，提供了丰富的实用工具函数和组件。

## 特性

- 🚀 完整的 TypeScript 支持
- 📦 模块化设计，支持按需引入
- 🔧 同时支持浏览器和 Node.js 环境
- 🎯 零依赖核心功能
- 🔄 支持 ESM 和 CommonJS 两种模块规范

## 安装

```bash
# npm
npm install ucc-utils

# yarn
yarn add ucc-utils

# pnpm
pnpm add ucc-utils
```

## 依赖说明

### 核心依赖
```bash
npm install axios lodash
```

### 可选依赖
根据需要使用的功能安装相应的依赖：

```bash
# Vue 相关功能
npm install vue

# Cesium 相关功能
npm install cesium

# Redis 相关功能（仅服务端）
npm install redis
```

## 功能模块

### 浏览器端模块
- **Core 核心工具**
  - 基础工具函数
  - 类型判断
  - 性能优化
  - 异常处理
  - 正则表达式工具

- **DOM 操作**
  - DOM 元素操作
  - 事件处理
  - 虚拟 DOM 工具

- **Request**
  - HTTP 请求封装
  - 请求拦截器
  - 响应处理

- **Storage**
  - LocalStorage 封装
  - SessionStorage 封装
  - IndexedDB 工具

- **Worker**
  - Web Worker 工具
  - 多线程处理

### 通用模块（浏览器/服务端）
- **SQL**
  - 数据库查询构建
  - 数据库操作工具

- **Socket**
  - WebSocket 客户端
  - WebSocket 服务端
  - 实时通信工具

### 可选功能模块
- **Vue 相关**（需要 vue）
  - Hooks
  - 组件
  - 工具函数

- **Cesium 相关**（需要 cesium）
  - 地图工具
  - 3D 渲染

- **Redis**（仅服务端，需要 redis）
  - Redis 客户端封装
  - 缓存管理

## 使用示例

### 浏览器端功能
```typescript
// 核心功能
import { core, dom, request, storage, worker } from 'ucc-utils';
// 或按需导入
import { core } from 'ucc-utils/core';
import { dom } from 'ucc-utils/dom';
```

### 通用功能
```typescript
// 可在浏览器和服务端使用
import { sql, socket } from 'ucc-utils';
// 或按需导入
import { sql } from 'ucc-utils/sql';
import { socket } from 'ucc-utils/socket';
```

### 可选功能
```typescript
// Vue 相关（需要安装 vue）
import { hooks } from 'ucc-utils/hooks';
import { components } from 'ucc-utils/vue';

// Cesium 相关（需要安装 cesium）
import { cesium } from 'ucc-utils/cesium';

// Redis（仅服务端，需要安装 redis）
import { Redis } from 'ucc-utils/storage/redis';
```

## 示例

### 使用核心工具函数

```typescript
import { core } from 'ucc-utils';

// 类型判断
core.isArray([1, 2, 3]); // true
core.isObject({}); // true

// 性能优化
const debouncedFn = core.debounce(() => {
  // 你的代码
}, 300);
```

### 使用 DOM 操作

```typescript
import { dom } from 'ucc-utils';

// 元素选择
const element = dom.querySelector('#app');

// 事件处理
dom.addEvent(element, 'click', (e) => {
  // 处理点击事件
});
```

### 使用 Hooks

```typescript
import { useNextId } from 'ucc-utils/hooks';

// 在 Vue 组件中
const id = useNextId();
```

## API 文档

详细的 API 文档请访问：[API Documentation](https://github.com/YuluoY/ucc-utils/docs)

## 浏览器兼容性

- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 不支持 IE

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 许可证

MIT © [Yuluo](https://github.com/YuluoY)
