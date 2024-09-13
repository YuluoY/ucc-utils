export * from './truth'
export * from './virtual'

import * as truth from './truth'
import * as virtual from './virtual'

export default {
  ...truth,
  ...virtual
}
