import { ModelCompProps } from './../types'
import { isEmpty, isNil, isPlainObject } from 'lodash'
import { ComponentInternalInstance, getCurrentInstance, inject, provide } from 'vue'
import { DC_ROOT_KEY } from '../constants'

interface IHandleDeepTransferOpts {
  instance?: ComponentInternalInstance | null
}

interface IHandleDeepTransferResult {
  injectData: any
  $root: Record<string, any>
}

/**
 * 处理 provide / inject
 * @param   {object} opts
 * @param   {import('vue').ComponentInternalInstance} opts.instance
 * @returns {{injectData: any, $root: object}}
 */
export default function handleDeepTransfer(
  this: ModelCompProps,
  opts: IHandleDeepTransferOpts = {}
): IHandleDeepTransferResult {
  const { instance = getCurrentInstance() } = opts

  let injectData = null
  let $root = inject(DC_ROOT_KEY, null) as IHandleDeepTransferResult['$root'] | null

  // provide / inject data
  if (this.provide && isPlainObject(this.provide) && !isEmpty(this.provide)) {
    if (isNil(this.provide.key) || this.provide.key === '')
      throw new Error('DC: The props of provide must have a key prop.')
    provide(this.provide.key, this.provide.value)
  }
  if (this.inject) injectData = inject(this.inject, null)

  // 初始化 $root
  if (!$root) {
    $root = (instance?.appContext.config.globalProperties || {}) as object
    // @ts-ignore
    $root.$modelValues = $root.$modelValues ?? {}
    provide(DC_ROOT_KEY, $root)
  }

  // 初始化顶层的 modelValues
  // if (!inject(DC_MODELVALUES_KEY, null))
  // {
  //   const modelValues = reactive({})
  //   $root.$modelValues[namespace] = modelValues
  //   provide(DC_MODELVALUES_KEY, {
  //     lastNamespace: namespace,
  //     value: modelValues
  //   })
  // }

  return {
    injectData,
    $root
  }
}
