export * from './src/core' // 核心工具
export * from './src/dom' // dom操作
export * from './src/storage' // 本地存储
export * from './src/hooks' // 钩子函数
export * from './src/request' // 请求类
export * from './src/sql' // sql工具操作
export * from './src/worker' // web worker
export * from './src/socket' // websocket
export * from './src/cesium' // cesium工具

/**
 * lodash工具
 */
import lodash from 'lodash'
// export const _ = lodash

import * as core from './src/core'
import * as dom from './src/dom'
import * as storage from './src/storage'
import * as hooks from './src/hooks'
import * as request from './src/request'
import * as sql from './src/sql'
import * as worker from './src/worker'
import * as socket from './src/socket'
import * as cesium from './src/cesium'

export default {
  core,
  dom,
  storage,
  hooks,
  request,
  sql,
  worker,
  socket,
  cesium,
  _: lodash
}
