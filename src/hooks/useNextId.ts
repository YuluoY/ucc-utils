const _default = {
  count: 0
}

/**
 * 获取下一个ID
 * @param   {object}  opts
 * @param   {boolean} [opts.isOrderly=true] 是否有序id
 * @returns {string}
 */
export default function useNextId(opts: { isOrderly?: boolean } = {}): string {
  const { isOrderly = true } = opts
  return isOrderly ? ++_default.count + '' : Math.random().toString(36).substr(2, 9)
}
