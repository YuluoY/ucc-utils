/**
 * 处理根字体大小 rem 响应式布局
 */
export default function useRootFontSize({
  setRootFontSize,
  isAuto = false
}: {
  setRootFontSize?: (rootFontSize: number) => void
  isAuto?: boolean
}): {
  refreshRootFontSize: () => void
  destory: () => void
} {
  const refreshRootFontSize = (): void => {
    const width = window.innerWidth
    const baseFontSize = width / 100 // 示例：每100px视口宽度1rem
    document.documentElement.style.fontSize = `${baseFontSize}px`
    setRootFontSize?.(baseFontSize)
  }

  const destory = () => {
    window.removeEventListener('resize', refreshRootFontSize)
  }

  window.addEventListener('resize', refreshRootFontSize)
  isAuto && refreshRootFontSize()
  return {
    refreshRootFontSize,
    destory
  }
}
