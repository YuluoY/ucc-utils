export * from './core'
export * from './judge'
export * from './optimize'
export * from './except'
export * from './regExp'

import * as core from './core'
import * as judge from './judge'
import * as optimize from './optimize'
import * as except from './except'
import * as regExp from './regExp'

export default {
  ...core,
  ...judge,
  ...optimize,
  ...except,
  ...regExp
}
