import { isRef, onMounted, onUnmounted, Ref } from 'vue'
import { debounce, isFunction, throttle } from 'lodash'

// 扩展原生事件监听选项，添加防抖和节流配置
interface EventOptions extends AddEventListenerOptions {
  debounce?: number // 防抖延迟时间（毫秒）
  throttle?: number // 节流延迟时间（毫秒）
  immediate?: boolean // 是否立即执行
}

// 定义目标类型：可以是DOM元素或返回DOM元素的函数
type TargetType = EventTarget | (() => EventTarget) | Ref<EventTarget>
// 定义清理函数类型
type CleanupFn = () => void

/**
 * 使用addEventListener监听事件，仅在vue3中使用
 * @author  Yuluo
 * @link    https://github.com/YuluoY
 * @date    2025-02-11
 * @param target    监听目标（DOM元素或返回DOM元素的函数）
 * @param event     事件名称
 * @param callback  事件处理函数
 * @param options   配置选项（包括防抖、节流等）
 * @returns         清理函数，用于手动移除事件监听
 * @example
 * ```ts
 * const cleanup = useEventListener(document.querySelector('#app'), 'click', () => {
 *   console.log('clicked')
 * })

 * // 使用ref
 * const ref = ref(document.querySelector('#app'))
 * const cleanup = useEventListener(ref, 'click', () => {
 *   console.log('clicked')
 * })
 * 
 * // 使用函数
 * const cleanup = useEventListener(() => document.querySelector('#app'), 'click', () => {
 *   console.log('clicked')
 * })
 * 
 *  * // 在需要时手动清理
 * cleanup()
 * 
 * ```
 */
export default function useEventListener(
  target: TargetType,
  event: keyof WindowEventMap,
  callback: EventListener,
  options: EventOptions = {}
): CleanupFn {
  // 存储实际的DOM元素引用
  let element: EventTarget | null = null

  // 清理函数：移除事件监听
  const cleanup: CleanupFn = () => {
    if (element) {
      element.removeEventListener(event, callback)
    }
  }

  // 如果配置了防抖，包装回调函数
  if (options.debounce) {
    callback = debounce(callback, options.debounce)
  }

  // 如果配置了节流，包装回调函数
  if (options.throttle) {
    callback = throttle(callback, options.throttle)
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    if (target) {
      // 如果target是函数则执行它获取DOM元素，否则直接使用
      element = isRef(target) ? target.value : isFunction(target) ? target() : target
      element.addEventListener(event, callback, options)
      if (options.immediate) {
        callback(new Event(event))
      }
    }
  })

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    cleanup()
    // 如果使用了防抖或节流，需要取消待执行的函数
    if (options.debounce || options.throttle) {
      ;(callback as any).cancel?.()
    }
  })

  // 返回清理函数，允许在需要时手动清理
  return cleanup
}
