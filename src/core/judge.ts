/**
 * 均为类型判断函数
 */

/**
 * 是否是基本类型
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isPrimitive = (val: any): boolean => {
  return (
    typeof val === 'number' ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'symbol' ||
    val === null ||
    val === undefined
  )
}

/**
 * 是否是函数
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isFunction = (val: any): boolean => typeof val === 'function'

/**
 * 是否是对象
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isObject = (val: any): boolean => typeof val === 'object' && val !== null

/**
 * 是否是空对象
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isEmptyObject = (val: any): boolean =>
  typeof val === 'object' && val !== null && Object.keys(val).length === 0

/**
 * 是否是字符串
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isString = (val: any): boolean => typeof val === 'string'

/**
 * 是否是数组
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isArray = (val: any): boolean => Array.isArray(val)

/**
 * 是否是浮点小数
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isFloat = (val: any): boolean => typeof val === 'number' && !Number.isInteger(val)

/**
 * 是否是数字
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isNumber = (val: any): boolean => typeof val === 'number'

/**
 * 是否是整形数字
 * @author      Yuluo
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 */
export const isInteger = (val: any): boolean => typeof val === 'number' && Number.isInteger(val)
