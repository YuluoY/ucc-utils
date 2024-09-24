/**
 * 均为类型判断函数
 */

/**
 * 是否是基本类型
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isPrimitive(1) // true
 *  isPrimitive('1') // true
 *  isPrimitive(true) // true
 *  isPrimitive(null) // true
 *  isPrimitive(undefined) // true
 *  isPrimitive({}) // false
 *  isPrimitive([]) // false
 *  isPrimitive(() => {}) // false
 *  ```
 */
export const isPrimitive = (val: any): val is boolean => {
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
 * 是否有值
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  hasValue(1) // true
 *  hasValue('1') // true
 *  hasValue(true) // true
 *  hasValue(null) // false
 *  hasValue(undefined) // false
 * ```
 */
export const hasValue = (val: any): val is boolean => val !== null && val !== undefined

/**
 * 是否为null
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isNull(null) // true
 *  isNull(undefined) // false
 * ```
 */
export const isNull = (val: any): val is boolean => val === null

/**
 * 是否为undefined
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isUndefined(undefined) // true
 *  isUndefined(null) // false
 * ```
 */
export const isUndefined = (val: any): val is boolean => val === undefined

/**
 * 是否是函数
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isFunction(() => {}) // true
 *  isFunction(1) // false
 *  isFunction('1') // false
 * ```
 */
export const isFunction = (val: any): val is boolean => typeof val === 'function'

/**
 * 是否是对象
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isObject({}) // true
 *  isObject([]) // true
 *  isObject(1) // false
 * ```
 */
export const isObject = (val: any): val is boolean => typeof val === 'object' && val !== null

/**
 * 是否是普通对象
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isPlainObject({}) // true
 *  isPlainObject([]) // false
 *  isPlainObject(1) // false
 * ```
 */
export const isPlainObject = (val: any): val is boolean => {
  if (typeof val !== 'object' || val === null) return false
  const proto = Object.getPrototypeOf(val)
  return proto === Object.prototype || proto === null
}

/**
 * 是否是空对象
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isEmptyObject({}) // true
 *  isEmptyObject({a: 1}) // false
 *  isEmptyObject([]) // false
 * ```
 */
export const isEmptyObject = (val: any): val is boolean =>
  typeof val === 'object' && val !== null && Object.keys(val).length === 0

/**
 * 是否是普通空对象
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isEmptyPlainObject({}) // true
 *  isEmptyPlainObject({a: 1}) // false
 *  isEmptyPlainObject([]) // false
 * ```
 */
export const isEmptyPlainObject = (val: any): val is boolean => isPlainObject(val) && Object.keys(val).length === 0

/**
 * 是否是字符串
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isString('1') // true
 *  isString(1) // false
 *  isString(true) // false
 * ```
 */
export const isString = (val: any): val is boolean => typeof val === 'string'

/**
 * 是否是数组
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isArray([1, 2, 3]) // true
 *  isArray('1,2,3') // false
 * ```
 */
export const isArray = (val: any): val is boolean => Array.isArray(val)

/**
 * 是否是空数组
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isEmptyArray([1, 2, 3]) // false
 *  isEmptyArray([]) // true
 * ```
 */
export const isEmptyArray = (val: any): val is boolean => Array.isArray(val) && val.length === 0

/**
 * 是否是浮点小数
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isFloat(1) // false
 *  isFloat(1.1) // true
 *  isFloat('1.1') // false
 * ```
 */
export const isFloat = (val: any): val is boolean => typeof val === 'number' && !Number.isInteger(val)

/**
 * 是否是数字
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isNumber(1) // true
 *  isNumber(1.1) // true
 *  isNumber('1') // false
 *  isNumber('1.1') // false
 * ```
 */
export const isNumber = (val: any): val is boolean => typeof val === 'number'

/**
 * 是否是整形数字
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @param       {any}           val       需要判断的值
 * @return      {boolean}
 * @example
 * ```ts
 *  isInteger(1) // true
 *  isInteger(1.1) // false
 * ```
 */
export const isInteger = (val: any): val is boolean => typeof val === 'number' && Number.isInteger(val)

// eslint-disable-next-line no-useless-escape
const JSONRegExp = /^[\[\{].*[\]\}]$|^"(?:\\.|[^"\\])*"$|^-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?$|^(true|false|null)$/
/**
 * 判断是否是JSON string
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {any}       str   - 要检查的值
 * @returns     {boolean}         - 如果是JSON string返回 true，否则返回 false
 * @example
 * ```ts
 *  isJSONString('{"name": "John", "age": 30}') // true
 *  isJSONString('{"name": "John", "age": 30,}') // false
 * ```
 */
export const isJSONString = (str: any): str is boolean => {
  if (typeof str !== 'string') return false
  return JSONRegExp.test(str.trim())
}

const StringNumRegExp = /^\d+(\.\d+)?$/
/**
 * 判断是否是字符串数字
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-24
 * @param       {any}       str   - 要检查的值
 * @returns     {boolean}         - 如果是字符串数字返回 true，否则返回 false
 * @example
 * ```ts
 *  isStringNumber('123') // true
 *  isStringNumber('123.45') // true
 *  isStringNumber('abc') // false
 * ```
 */
export const isStringNumber = (str: any): str is boolean => {
  if (typeof str !== 'string') return false
  return StringNumRegExp.test(str.trim())
}

const WinRegExps = [/Win/i, /Win(?:dows)?/i] as RegExp[]
/**
 * 判断当前系统是否是 Windows 系统
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @return      {boolean}
 * @example
 * ```ts
 *  isWindows() // true or false
 * ```
 */
export const isWindows = (): boolean => {
  // 检查 navigator 是否存在，以确保在浏览器环境中运行
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return WinRegExps[0].test(navigator.platform) || WinRegExps[1].test(navigator.userAgent)
  }
  // 如果不是浏览器环境，默认返回 false
  return false
}

const MacRegExps = [/Mac(?:intosh|Intel|PPC|68K)/i, /Mac/i] as RegExp[]
/**
 * 判断当前系统是否是 macOS 系统
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @return      {boolean}
 * @example
 * ```ts
 *  isMacOS() // true or false
 * ```
 */
export const isMacOS = (): boolean => {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return MacRegExps[0].test(navigator.platform) || MacRegExps[1].test(navigator.userAgent)
  }
  return false
}

const MobileRegExp =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Windows Mobile|MeeGo|Tizen|Bada|Kindle|Silk|MiuiBrowser|SamsungBrowser|OPR\/|Fennec/i
/**
 * 判断是否是移动端
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @return      {boolean}
 * @example
 * ```ts
 *  isMobile() // true or false
 * ```
 */
export const isMobile = (): boolean => {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return MobileRegExp.test(navigator.userAgent.toLocaleLowerCase())
  }
  return false
}

/**
 * 判断是否是PC端
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @return      {boolean}
 * @example
 * ```ts
 *  isPC() // true or false
 * ```
 */
export const isPC = (): boolean => !isMobile()

const UrlRegExp = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
/**
 * 判断是否是URL
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {string}      url       - 要检查的URL
 * @return      {boolean}
 * @example
 * ```ts
 *  isURL('https://www.baidu.com') // true
 *  isURL('www.baidu.com') // true
 *  isURL('baidu.com') // true
 * ```
 */
export const isURL = (url: string): boolean => UrlRegExp.test(url)

const EmailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/**
 * 判断是否是Email
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {string}      email     - 要检查的Email
 * @return      {boolean}
 * @example
 * ```ts
 *  isEmail('123456789@qq.com') // true
 * ```
 */
export const isEmail = (email: string): boolean => EmailRegExp.test(email)

const PhoneRegExps: RegExp[] = [
  /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, //宽松模式
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/ //严格模式
]
/**
 * 判断是否是移动手机号 - 有严格与宽松两种模式
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {string}      phone     - 要检查的手机号
 * @param       {boolean}     strict    - 是否严格模式，默认为 false
 * @return      {boolean}
 * @example
 * ```ts
 * isPhone('12345678901') // true
 * isPhone('12345678901', true) // false
 * ```
 */
export const isPhone = (phone: string, strict: boolean = false): boolean =>
  strict ? PhoneRegExps[1].test(phone) : PhoneRegExps[0].test(phone)

const QQRegExp = /^[1-9][0-9]{4,10}$/
/**
 * 判断是否是QQ号
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {string}      qq        - 要检查的QQ号
 * @return      {boolean}
 * @example
 * ```ts
 * isQQ('123456789') // true
 * ```
 */
export const isQQ = (qq: string): boolean => QQRegExp.test(qq)

/**
 * 是否是Promise
 * @param       {any}         obj       - 要检查的对象
 * @return      {boolean}
 * @example
 * ```ts
 * isPromise(Promise.resolve()) // true
 * ```
 */
export const isPromise = (obj: any): boolean => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
