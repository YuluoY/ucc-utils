export * from './cookie' // 4KB
export * from './localStorage' // 2.5-10MB
export * from './sessionStorage' // 2.5-10MB
export * from './indexDB' // >250MB
export * from './redis' // >250MB

import * as cookie from './cookie'
import * as localStorage from './localStorage'
import * as sessionStorage from './sessionStorage'
import * as indexDB from './indexDB'
import * as redis from './redis'

export default {
  cookie,
  localStorage,
  sessionStorage,
  indexDB,
  redis
}
