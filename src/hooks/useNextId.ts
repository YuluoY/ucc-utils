const _default = {
  count: 0
}
/**
 * 获取下一个ID
 * @author  Yuluo  {@link https://github.com/YuluoY}
 * @date    2024-10-05
 * @param   {object}  opts
 * @param   {boolean} [opts.isOrderly=true] 是否有序id
 * @returns {string}
 * @example
 * ```ts
 * useNextId() // '1'
 * useNextId({ isOrderly: false }) // '0x1g4k'
 * ```
 */
export default function useNextId(opts: { isOrderly?: boolean } = {}): string {
  const { isOrderly = true } = opts
  return isOrderly ? ++_default.count + '' : Math.random().toString(36).substr(2, 9)
}
