import { debounce, get, isEmpty, isNil, isObject, isPlainObject, isString, merge, set } from 'lodash'
import { WatchStopHandle, inject, nextTick, onBeforeUnmount, provide, reactive, ref, watch } from 'vue'
import { DC_MODELVALUES_KEY, DC_RENDER_BACK_KEY } from '../constants'
import { ModelCompExposes, ModelCompProps } from '../types'
import { getType, parseStrWithType } from '@/core'

interface IHandleModelValueOpts {
  $root?: Record<string, any>
  ctx?: Record<string, any>
  namespace?: string
}

type IHandleModelValueResult = Pick<
  ModelCompExposes,
  'setModelValue' | 'setModelValues' | 'modelValue' | 'modelValues' | 'setModelValuesByPath'
>

export default function handleModelValue(this: ModelCompProps, opts: IHandleModelValueOpts): IHandleModelValueResult {
  const { $root, ctx, namespace } = opts

  const _this = this as ModelCompProps

  /**
   * 数据回显
   */
  let isRenderBack = inject(DC_RENDER_BACK_KEY, null) as boolean | null
  if (isRenderBack === null) {
    isRenderBack = isObject(_this.modelValues) && !isEmpty(_this.modelValues) ? true : false
    provide(DC_RENDER_BACK_KEY, isRenderBack)
  }

  /**
   * modelValues
   */
  let modelValues = null as ModelCompProps['modelValues'] | null
  let modelValuesWatcher = null
  if (_this.modelValues) {
    if (isString(_this.modelValues)) {
      modelValues = reactive({})
      $root!.$modelValues[namespace!] = modelValues
    } else if (isPlainObject(_this.modelValues)) {
      modelValues = reactive(_this.modelValues)
      $root!.$modelValues[namespace!] = modelValues
    } else throw new Error('DC: The modelValues must be string or object')
    modelValuesWatcher = watch(modelValues, (val) => ctx!.emit('update:modelValues', val), { deep: true })
  } else {
    modelValues = inject(DC_MODELVALUES_KEY, null)
    if (isNil(modelValues)) {
      modelValues = reactive({})
      $root!.$modelValues[namespace!] = modelValues
    }
  }
  provide(DC_MODELVALUES_KEY, modelValues)

  /**
   * modelValue
   */
  const modelValue = ref<any>(null)
  const oldModelValue = ref(null)
  let modelValueWatcher = null as WatchStopHandle | null

  if (_this.props?.modelValue) {
    if (isPlainObject(_this.props.modelValue)) modelValue.value = parseStrWithType(_this.props.modelValue.value)

    // 回显数据
    if (isRenderBack) {
      const val = get(modelValues, _this.props.modelValue.path)
      modelValue.value = isNil(val) ? modelValue.value : val
    } else !_this.props.isAsync && set(modelValues, _this.props.modelValue.path, modelValue)

    // 监听modelValue变化
    nextTick(() => {
      oldModelValue.value = modelValue.value
      const debounceUpdateModelValue = debounce((val: any) => updateModelValue(val), 500)
      modelValueWatcher = watch(modelValue, debounceUpdateModelValue, { deep: isObject(modelValue.value) })
    })
  }

  // 更新modelValue，并触发change事件
  function updateModelValue(val: any) {
    if (!_this.props?.modelValue?.path) throw new Error('DC: The modelValue.path must be required')

    val = parseStrWithType(val)
    set(modelValue, _this.props.modelValue.path, val)
    setTimeout(() => ctx?.emit('change', val), 0)

    console.table([
      {
        path: _this.props.modelValue.path,
        value: val,
        type: getType(val)
      }
    ])
    console.log(modelValues)
  }

  onBeforeUnmount(() => {
    modelValuesWatcher && modelValuesWatcher()
    modelValueWatcher && modelValueWatcher()
  })

  /**
   * 设置modelValue值
   * @param {any} val 新值
   */
  function setModelValue(val: any) {
    if (modelValue.value !== val) modelValue.value = val
  }

  /**
   * 更新modelValues - 合并对象
   * @param val 新值
   */
  function setModelValues(val: object) {
    if (val && isPlainObject(val) && !isEmpty(val)) merge(modelValues, val)
  }

  /**
   * 更新modelValues中的属性
   * @param {string | string[]}  path  属性路径
   * @param {any}                val    新值
   */
  function setModelValuesByPath(path: string | string[], val: any) {
    set(modelValues as object, path, val)
  }

  return {
    modelValue,
    modelValues,
    setModelValue,
    setModelValues,
    setModelValuesByPath
  }
}
