import { HandleExceptionOptions, HandleExceptionResult } from './types/except'

/**
 * 异常处理函数
 * @author Yuluo
 * @date 2024-08-29
 * @template  {T}
 * @param     {Function}          fn                      函数
 * @param     {Object}            opts
 * @param     {Array}             [opts.fnArgs=[]]        函数参数，默认为[ ]
 * @param     {Boolean}           [opts.isToThrow=false]  是否抛出异常，默认为false
 * @param     {Function}          [opts.onErrorFn=null]   异常处理函数，默认为null
 * @returns   {Promise<[T, any]>}
 * @example
 * ```js
 *  const getDataBind = getData.bind(this, '123')
 *  const [data, err] = await handleException(getDataBind, { onErrorFn: console.log })
 * ```
 */
export const handleException = async <T = any>(
  fn: Function,
  opts: HandleExceptionOptions
): HandleExceptionResult<T> => {
  const { fnArgs = [], isToThrow = false, onErrorFn = null } = opts

  const o = [] as unknown as [T, any]
  try {
    o[0] = await fn(...fnArgs)
  } catch (err: any) {
    if (isToThrow) {
      throw new Error(err)
    }
    if (onErrorFn && typeof onErrorFn === 'function') {
      onErrorFn(err.message || err)
    }
    o[1] = err
  }
  return o
}
