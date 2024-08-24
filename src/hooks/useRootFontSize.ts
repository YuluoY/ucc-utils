/**
 * 处理根字体大小 rem 响应式布局
 * @author Yuluo
 * @date 2024-08-24
 * @example
 * ```js
 * const {
 *  refreshRootFontSize,
 *  destory,
 *  rootFontSize,
 *  resizeTimer
 * } = useRootFontSize({
 *    setRootFontSizeCallback: (rootFontSize) => {
 *      console.log(rootFontSize)
 *    },
 *    isAuto: true,
 *    resizeTimeout: 300
 * })
 * ```
 */
export default function useRootFontSize({
  setRootFontSizeCallback, // 设置根字体大小
  isAuto = false, // 是否自动初始化
  resizeTimeout = 300 // resize防抖时间
}: {
  resizeTimeout?: number
  setRootFontSizeCallback?: (rootFontSize: number) => void
  isAuto?: boolean
}): {
  rootFontSize?: number
  resizeTimer: NodeJS.Timeout | null
  refreshRootFontSize: () => void
  destory: () => void
} {
  let rootFontSize = 0
  let timer: NodeJS.Timeout | null = null

  /**
   * 刷新根字体大小
   */
  const refreshRootFontSize = (): void => {
    const width = window.innerWidth
    rootFontSize = width / 100 // 示例：每100px视口宽度1rem
    document.documentElement.style.fontSize = `${rootFontSize}px`
    setRootFontSizeCallback?.(rootFontSize)
  }

  /**
   * 防抖
   */
  const refreshRootFontSizeDebounce = (): void => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(refreshRootFontSize, resizeTimeout)
  }

  /**
   * 监听resize事件
   */
  window.addEventListener('resize', refreshRootFontSizeDebounce)

  /**
   * 销毁reszie
   */
  const destory = () => {
    window.removeEventListener('resize', refreshRootFontSizeDebounce)
  }

  /**
   * 初始化
   */
  isAuto && refreshRootFontSize()

  return {
    rootFontSize, // 根字体大小
    refreshRootFontSize, // 刷新根字体大小
    destory, // 销毁resize事件
    resizeTimer: timer // resize防抖定时器
  }
}
