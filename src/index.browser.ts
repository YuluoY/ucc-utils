// 浏览器端功能
export * from './core'
export * from './dom'
export * from './hooks'
export * from './request'
export * from './storage'

// 基础工具导入
import * as core from './core'
import * as dom from './dom'
import * as hooks from './hooks'
import * as request from './request'
import * as storage from './storage'

// 浏览器端默认导出
export default {
  core,
  dom,
  hooks,
  request,
  storage
}
