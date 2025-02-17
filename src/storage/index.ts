// 浏览器端存储
export * from './cookie' // 4KB
export * from './localStorage' // 2.5-10MB
export * from './sessionStorage' // 2.5-10MB
export * from './indexDB' // >250MB

import * as cookie from './cookie'
import * as localStorage from './localStorage'
import * as sessionStorage from './sessionStorage'
import * as indexDB from './indexDB'

// 仅导出浏览器端存储功能
export default {
  cookie,
  localStorage,
  sessionStorage,
  indexDB
}

// Redis 相关功能通过单独的路径导入
// import { redis } from 'ucc-utils/storage/redis'
