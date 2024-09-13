export * from './core'
export * from './judge'
export * from './optimize'
export * from './except'

import * as core from './core'
import * as judge from './judge'
import * as optimize from './optimize'
import * as except from './except'

export default {
  ...core,
  ...judge,
  ...optimize,
  ...except
}
