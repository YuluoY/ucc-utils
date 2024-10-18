import { root } from '../core'
import { debounce, type DebounceSettings, type DebouncedFunc } from 'lodash'

export interface URootFontSizeOptions {
  // 是否开启resize事件, 默认true
  isResize?: boolean
  // resize事件防抖时间, 默认300ms
  resizeTimeout?: number
  // 是否立即执行, 默认false
  immediate?: boolean
  // lodash防抖配置, 默认{}
  debounceOpt?: DebounceSettings
  // 设置根字体大小回调函数, 默认null
  setRootFontSizeCallback?: (rootFontSize: number) => void
}

export interface URootFontSizeReturn {
  rootFontSize?: number
  destory: () => void
  refreshRootFontSize: () => void
  refreshRootFontSizeDebounce?: DebouncedFunc<() => void>
}

/**
 * 处理根字体大小 rem 响应式布局
 * @author  Yuluo
 * @link    https://github.com/YuluoY
 * @date    2024-08-24
 * @param   {URootFontSizeOptions}  options                         配置项
 * @param   {number}                [options.resizeTimeout]           resize事件防抖时间, 默认300ms
 * @param   {boolean}               [options.isResize]                是否开启resize事件, 默认true
 * @param   {boolean}               [options.immediate]               是否立即执行, 默认false
 * @param   {DebounceSettings}      [options.debounceOpt]             lodash防抖配置, 默认{}
 * @param   {Function}              [options.setRootFontSizeCallback] 设置根字体大小回调函数, 默认null
 * @returns {URootFontSizeReturn}
 * @example
 * ```js
 * const {
 *  destory,                      // 销毁resize事件
 *  rootFontSize,                 // 根字体大小
 *  refreshRootFontSize,          // 刷新根字体大小函数
 *  refreshRootFontSizeDebounce,  // lodash的防抖函数
 * } = useRootFontSize({
 *    setRootFontSizeCallback: (rootFontSize) => {
 *      console.log(rootFontSize)
 *    },
 *    immediate: true,
 *    isResize: true,
 *    resizeTimeout: 300,
 *    debounceOpt: {
 *      // lodash防抖配置
 *    }
 * })
 * ```
 */
export default function useRootFontSize(options: URootFontSizeOptions): URootFontSizeReturn {
  const {
    debounceOpt = {} as DebounceSettings,
    setRootFontSizeCallback = null,
    immediate = false,
    isResize = true,
    resizeTimeout = 300
  } = options

  /**
   * 根字体大小 - 缓存
   */
  let rootFontSize = 0

  /**
   * 刷新根字体大小
   */
  const refreshRootFontSize = (): void => {
    const width = root?.innerWidth
    if (!width) {
      throw new Error(`${useRootFontSize.name}: root innerWidth is undefined`)
    }
    rootFontSize = width / 100 // 示例：每100px视口宽度1rem
    document.documentElement.style.fontSize = `${rootFontSize}px`
    setRootFontSizeCallback && typeof setRootFontSizeCallback === 'function' && setRootFontSizeCallback?.(rootFontSize)
  }

  /**
   * 防抖
   */
  const refreshRootFontSizeDebounce = debounce(refreshRootFontSize, resizeTimeout, debounceOpt)

  /**
   * 监听resize事件
   */
  isResize && window.addEventListener('resize', refreshRootFontSizeDebounce)

  /**
   * 销毁reszie
   */
  const destory = isResize ? () => window.removeEventListener('resize', refreshRootFontSizeDebounce) : () => {}

  /**
   * 自动初始化执行
   */
  immediate && refreshRootFontSize()

  return {
    destory,
    rootFontSize,
    refreshRootFontSize,
    refreshRootFontSizeDebounce
  }
}
