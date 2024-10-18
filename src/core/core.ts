import { cloneDeep, startsWith } from 'lodash'
import { ConvertRoutesToLevelOptions } from './types/core'
import { isStringArray, isStringFunction, isStringNumber, isStringObject } from './judge'
import {
  AddQuotesToPropsRegExp,
  CamelCaseRegExp,
  PlaceholderRegExp,
  SymbolRegExp,
  TrimCRRegExp,
  TrimNLRegExp,
  TrimSpaceRegExp,
  TrimTabRegExp,
  TrimWhitespaceRegExp,
  UnderlineToCamelCaseRegExp,
  UpperCaseRegExp
} from './regExp'

/**
 * window对象 - 兼容
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-24
 * @constant    {Window | null} root
 * @description 获取window对象，兼容浏览器、node、webworker等环境
 */
export const root: Window | null =
  typeof window === 'object' && window.Object === Object
    ? window
    : typeof globalThis === 'object' && globalThis.Object === Object
      ? globalThis
      : typeof global === 'object' && global.Object === Object
        ? global
        : typeof self === 'object' && self.Object === Object
          ? self
          : Function('return this')()

/**
 * 去掉字符串中的空格
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          去掉空格后的字符串
 * @example
 * ```ts
 * const str = ' 123 456 789  ';
 * trimSpace(str); // '123456789'
 * ```
 */
export const trimSpace = (str: string): string => str.replace(TrimSpaceRegExp, '')

/**
 * 去掉字符串中的换行符
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          去掉换行符后的字符串
 * @example
 * ```ts
 * const str = '123\n456\n789';
 * trimNL(str); // '123456789'
 * ```
 */
export const trimNL = (str: string): string => str.replace(TrimNLRegExp, '')

/**
 * 去掉字符串中的回车符
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          去掉回车符后的字符串
 * @example
 * ```ts
 * const str = '123\r456\r789';
 * trimCR(str); // '123456789'
 * ```
 */
export const trimCR = (str: string): string => str.replace(TrimCRRegExp, '')

/**
 * 去掉字符串中的制表符
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          去掉制表符后的字符串
 * @example
 * ```ts
 * const str = '123\t456\t789';
 * trimTabForString(str); // '123456789'
 * ```
 */
export const trimTab = (str: string): string => str.replace(TrimTabRegExp, '')

/**
 * 去掉字符串中的空格、换行符、回车符、制表符
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          去掉空格、换行符、回车符、制表符后的字符串
 * @example
 * ```ts
 * const str = ' 123 \n 456 \r 789 \t ';
 * trimWhitespace(str); // '123456789'
 * ```
 */
export const trimWhitespace = (str: string): string => str.replace(TrimWhitespaceRegExp, '')

/**
 * 给字符串中对象属性名加双引号
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str   字符串
 * @returns     {string}          给字符串中对象属性名加双引号后的字符串
 * @example
 * ```ts
 * const str = 'a:1,b:2,c:3';
 * const result = str.replace(addQuotesToProps, '"$1":$2');
 * console.log(result); // '"a":1,"b":2,"c":3'
 *
 * const str2 = '{a:1,b:2,c:3}';
 * const result2 = str2.replace(addQuotesToProps, '"$1":$2');
 * console.log(result2); // '{"a":1,"b":2,"c":3}'
 * ```
 */
export const addQuotesToProps = (str: string): string => str.replace(AddQuotesToPropsRegExp, '"$1":$2')

/**
 * 扁平路由表转换有层级的路由表
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-29
 * @param       {T}                             routes                        需要转换的路由表
 * @param       {ConvertRoutesToLevelOptions}   opts                          配置项
 * @param       {string}                        [opts.fld= 'id']              路由表中的id字段名，默认为id
 * @param       {string}                        [opts.glFld= 'parentId']      路由表中的父级id字段名，默认为parentId
 * @param       {string}                        [opts.childFld= 'children']   路由表中的子级字段名，默认为children
 * @param       {boolean}                       [opts.isJudgeType= true]      是否判断类型，默认为true
 * @param       {boolean}                       [opts.isChangeOwner= true]    是否改变原数组，默认为true
 * @returns     {T}                                                           返回转换后的路由表
 * @example
 * ```ts
 *   const routes = [
 *     { id: 1, pid: 0, name: 'home' },
 *     { id: 2, pid: 1, name: 'home1' },
 *     { id: 3, pid: 1, name: 'home2' },
 *     { id: 4, pid: 2, name: 'home3' },
 *   ]
 *   const result = convertRoutesToLevel(routes, { fld: 'id', glFld: 'pid', childFld: 'children' })
 *   // [
 *    {
 *      id: 1,
 *      pid: 0,
 *      name: 'home',
 *      children: [
 *         {
 *            id: 2,
 *            pid: 1,
 *            name: 'home1',
 *            children: [
 *              { id: 4, pid: 2, name: 'home3' }
 *            ]
 *         },
 *        { id: 3, pid: 1, name: 'home2' }
 *      ]
 *     }
 *   ]
 * ```
 */
export const convertRoutesToLevel = <T = any>(routes: T[], opts: ConvertRoutesToLevelOptions = {}): T[] => {
  const { fld = 'id', glFld = 'parentId', childFld = 'children', isJudgeType = true, isChangeOwner = true } = opts
  const newRoutes: T[] = isChangeOwner ? routes : cloneDeep(routes)
  for (const route of newRoutes as T[] | any[]) {
    if (route[glFld]) {
      const parent: T | any = isJudgeType
        ? newRoutes.find((item: T | any) => item[fld] && item[fld] === route[glFld])
        : newRoutes.find((item: T | any) => item[fld] && item[fld] == route[glFld])
      if (!parent) continue
      ;(parent[childFld] = parent[childFld] || []).push(route)
    }
  }
  return routes.filter((route: T | any) => !route[glFld]) as T[]
}

/**
 * 根据属性对数组分组
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-24
 * @template    {T}
 * @param       {T[]}                     array     需要分组的数组
 * @param       {string}                  prop      对某个属性的值进行分组
 * @returns     {{[key:string]: T[]}}               根据prop值分组后的对象数组
 * @example
 * ```js
 *  const array = [
 *    { name: 'hello world', age: 18 },
 *    { name: 'hello world', age: 20}
 *  ]
 *  groupByProp(array, 'name')
 *  // { 'hello world': [ { name: 'hello world', age: 18 }, { name: 'hello world', age: 20 } ] }
 * ```
 */
export const groupByProp = <T = any>(array: T[], prop: string): Record<string, T[]> | T[] => {
  if (!array?.length) return array
  return array.reduce((acc: any, item: any) => {
    const key = item[prop]
    ;(acc[key] || (acc[key] = [])).push(item)
    return acc
  }, {})
}

/**
 * 解析 JSON 字符串
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-24
 * @param       {string}        str           JSON 字符串
 * @param       {any}           [defVal={}]    默认返回值
 * @returns     {any}
 * @example
 * ```js
 *  parseJSON('{"name": "hello world"}')  // {name: 'hello world'}
 * ```
 */
export const parseJSON = <T = any>(str: string, defVal: T = {} as any): T => {
  if (!str) return defVal
  if (typeof str !== 'string') return defVal
  try {
    return JSON.parse(str)
  } catch (e) {
    return defVal
  }
}

/**
 * 英文单词首字母大写
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-24
 * @param       {string}      str       英文字符串
 * @returns     {string}
 * @example
 * ```js
 *  capitalizeForWord('hello world')  // Hello World
 * ```
 */
export const capitalizeForWord = (str: string): string => {
  if (!str) return ''
  return str.replace(UpperCaseRegExp, (match) => match.toUpperCase())
}

/**
 * 获取类型
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-08-24
 * @param       {any}           val       需要获取类型的值
 * @return      {string}
 * @example
 * ```js
 *  getType(1)    // number
 *  getType('1')  // string
 *  getType([])   // array
 *  getType({})   // object
 * ```
 */
export const getType = (val: any): string => Object.prototype.toString.call(val).slice(8, -1).toLowerCase()

/**
 * 将 CSS 渐变（线性或径向）转换为 ECharts 的渐变配置
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-14
 * @param       {string} cssGradient  - CSS 渐变字符串 (linear-gradient 或 radial-gradient)
 * @returns     {Object}              - ECharts 兼容的渐变配置 (linearGradient 或 radialGradient)
 * @example
 * ```js
 *  cssGradientToECharts('linear-gradient(45deg, rgba(255, 0, 0, 1) 0%, rgba(0, 255, 0, 1) 100%)');
 *
 *  // 输出:
 *  {
 *    type: 'linear',
 *    x: 0.7071067811865476,
 *    y: 0.7071067811865475,
 *    x2: 1,
 *    y2: 0,
 *    colorStops:
 *      [
 *        { offset: 0, color: 'rgba(255, 0, 0, 1)' },
 *        { offset: 1, color: 'rgba(0, 255, 0, 1)' }
 *      ],
 *    global: false,
 *    value: 'linear-gradient(45deg, rgba(255, 0, 0, 1) 0%, rgba(0, 255, 0, 1) 100%)'
 *  }
 *  ```
 */
export function cssGradientToECharts(cssGradient: string):
  | {
      type: 'linear' | 'radial'
      x: number
      y: number
      x2?: number
      y2?: number
      r?: number
      colorStops: { offset: number; color: string }[]
      global: boolean
      value: string
    }
  | string {
  // 判断是线性渐变还是径向渐变
  const isLinear = cssGradient.startsWith('linear-gradient')
  const isRadial = cssGradient.startsWith('radial-gradient')

  // 正则匹配 rgba 或 rgb 颜色和百分比位置
  const regex = /rgba?\((\d+), (\d+), (\d+),? ([\d.]+)?\)\s(\d+)%/g
  let match: RegExpExecArray | null
  const colorStops: { offset: number; color: string }[] = []

  // 提取所有颜色和它们的百分比位置
  while ((match = regex.exec(cssGradient)) !== null) {
    const [r, g, b, a = '1', position] = match.slice(1)
    colorStops.push({
      offset: parseInt(position) / 100, // 将百分比转换为 0-1 范围
      color: `rgba(${r}, ${g}, ${b}, ${a})`
    })
  }

  if (isLinear) {
    // 解析线性渐变的方向
    const angleMatch = /linear-gradient\(([\d.]+)deg/.exec(cssGradient)
    const angle = angleMatch ? parseFloat(angleMatch[1]) : 0

    // 返回 ECharts 的 linearGradient 配置
    return {
      type: 'linear',
      x: Math.cos((angle * Math.PI) / 180), // 将角度转换为 x 方向
      y: Math.sin((angle * Math.PI) / 180), // 将角度转换为 y 方向
      x2: 1,
      y2: 0,
      colorStops: colorStops,
      global: false,
      value: cssGradient
    }
  } else if (isRadial) {
    // 返回 ECharts 的 radialGradient 配置
    return {
      type: 'radial',
      x: 0.5, // 渐变中心 x 坐标
      y: 0.5, // 渐变中心 y 坐标
      r: 0.5, // 渐变半径
      colorStops: colorStops,
      global: false,
      value: cssGradient
    }
  } else {
    // 如果不支持，返回原始字符串
    return cssGradient
    // throw new Error('不支持的渐变类型，仅支持 linear-gradient 和 radial-gradient。');
  }
}

/**
 * 设置对象属性值（支持深度路径）
 * @deprecated 已废弃，建议使用 _.set
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-14
 * @param       {Record<string, any>}           obj             - 目标对象
 * @param       {string | string[]}             path            - 属性路径，支持点分隔的字符串或数组
 * @param       {any}                           val             - 要设置的值
 * @param       {string}                        [splitter='.']  - 分隔符，默认为 '.'
 * @returns     {[Record<string, any>, string]}                 - 修改后的对象和最后一个属性的 key
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * setValue(obj, 'a.b.c', 2) // obj = { a: { b: { c: 2 } } }
 * ```
 */
export function setValue<T = any>(
  obj: Record<string, any>,
  path: string | string[],
  val: any,
  splitter: string = '.'
): [Record<string, T>, string] {
  // 如果 path 是字符串且不包含分隔符，直接赋值
  if (typeof path === 'string') {
    if (path.indexOf(splitter) === -1) {
      obj[path] = val
      return [obj, path]
    }
    // 如果包含分隔符，将字符串按分隔符拆分成数组
    path = path.split(splitter)
  }

  let active = obj // 当前操作的对象
  const length = path.length // 路径长度

  // 遍历路径，确保路径中的对象存在
  for (let i = 0; i < length - 1; i++) {
    const p = path[i]
    // 如果路径中的对象不存在，则创建新对象
    active = active[p] = active[p] || {}
  }

  const lastKey = path[length - 1] // 获取路径中的最后一个 key
  // 如果最后一个 key 对应的是数组，则将值加入数组；否则直接赋值
  if (Array.isArray(active[lastKey])) {
    active[lastKey].push(val)
  } else {
    active[lastKey] = val
  }

  return [active, lastKey] // 返回修改后的对象和最后一个 属性key
}

/**
 * 获取对象属性值（支持深度路径）
 * @deprecated  已废弃，建议使用 _.get
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-14
 * @param       {Record<string, any>} obj             - 目标对象
 * @param       {string | string[]}   path            - 属性路径，支持点分隔的字符串或数组
 * @param       {string}              [splitter='.']  - 分隔符，默认为 '.'
 * @returns     {any}                                 - 属性值
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * getValue<number>(obj, 'a.b.c') // 1
 *
 * const obj2 = { a: { b: { c: 1 } } }
 * getValue(obj, 'a.b.c.d') // undefined
 * ```
 */
export function getValue<T = any>(obj: Record<string, any>, path: string | string[], splitter: string = '.'): T {
  if (typeof path === 'string') {
    path = path.split(splitter)
  }
  return path.reduce((o, k) => (o || {})[k], obj) as T
}

/**
 * watch 监听一个函数返回为 true 的时机，并执行回调 - 有执行间隔和次数限制
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-14
 * @param       {(() => Promise<boolean>) | (() => boolean)}    fn                  - 监听的函数
 * @param       {(() => Promise<void>) | (() => void)}          callback            - 回调函数
 * @param       {object}                                        [options]           - 配置项
 * @param       {number}                                        [options.delay]     - 执行间隔，单位毫秒，默认 100
 * @param       {number}                                        [options.limit]     - 执行次数限制，默认 1
 * @param       {number}                                        [options.timeout]   - 超时时间，单位毫秒，默认 0，表示不限制
 * @param       {() => void}                                    [options.timeoutFn] - 超时回调函数
 * @returns     {() => void}                                                        - 取消监听的函数
 * @example
 * ```ts
 * const cancel = watchFn(() => isReady(), () => {
 *   console.log('isReady')
 * }, { delay: 100, limit: 1, timeout: 5000, timeoutFn: () => {} })
 * // 取消监听
 * cancel()
 * ```
 */
export function watchFn(
  fn: (() => boolean) | (() => Promise<boolean>),
  callback: (() => void) | (() => Promise<void>),
  options: Partial<{
    delay: number
    limit: number
    timeout: number
    timeoutFn: () => void
  }> = {}
): () => void {
  const { delay = 100, limit = 1, timeout = 0, timeoutFn } = options

  let count = 0
  const startTime = Date.now()
  const interval = setInterval(async () => {
    if (timeout && Date.now() - startTime > timeout) {
      timeoutFn && typeof timeoutFn === 'function' && timeoutFn()
      clearInterval(interval)
      return
    }
    if (await fn()) {
      await callback()
      if (++count >= limit) {
        clearInterval(interval)
      }
    } else {
      count = 0
    }
  }, delay) as any

  return () => clearInterval(interval)
}

/**
 * 立即执行函数
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-24
 * @param       {() => void}  fn  - 需要执行的函数
 * @returns     {any}             - 返回值
 */
export const runFn = <T = any>(fn: () => T, ctx: any): T => {
  if (ctx) return fn.call(ctx)
  return fn()
}

/**
 * 将字符串对象解析为带类型的对象
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-28
 * @param       {string}    str     - 字符串值
 * @returns     {any}               - 带类型的值
 * @example
 * ```ts
 * const str = "{a: 10, b: function() {}, c: 'jhahah', d: null, e: undefined, f: [1,2,3,4]}"
 * const obj = parseStrWithType(str3);
 *
 *  console.log(obj);
 *  // {a: 10, b: function() {}, c: 'jhahah', d: null, e: undefined, f: [1, 2, 3, 4]}
 * ```
 */
export const parseStrWithType = <T = any>(str: string): T | string => {
  try {
    return new Function(`return ${str}`)()
  } catch (e) {
    return str as string
  }
}

/**
 * 字符串值还原类型值
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-09-24
 * @param       {string}  str - 字符串
 * @returns     {any}         - 还原后的值
 * @example
 * ```ts
 * restoreValue('undefined') // undefined
 * restoreValue('null') // null
 * restoreValue('true') // true
 * restoreValue('false') // false
 * restoreValue('NaN') // NaN
 * restoreValue('Infinity') // Infinity
 * restoreValue('-Infinity') // -Infinity
 * restoreValue<string>('123') // 123
 * restoreValue<{a: number}>('{"a":1}') // {a: 1}
 * restoreValue<{a: number[]}>('{a:[1,2,3]}') // {a: [1,2,3]}
 * restoreValue<number[]>('[1,2,3]') // [1,2,3]
 * ```
 */
export function restoreValue<T = any>(str: string): T {
  if (typeof str !== 'string') return str
  str = str.trim()

  if (str === 'undefined') return undefined as T
  if (str === 'null') return null as T
  if (str === 'true') return true as T
  if (str === 'false') return false as T
  if (str === 'NaN') return NaN as T
  if (str === 'Infinity') return Infinity as T
  if (str === '-Infinity') return -Infinity as T
  if (isStringNumber(str)) return Number(str) as T
  if (isStringArray(str) || isStringObject(str) || isStringFunction(str)) return parseStrWithType<T>(str) as T
  return str as T
}

/**
 * 将字符串 ==> 对象，并解析其中的函数和符号
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-15
 * @param       {string}  str  - 字符串
 * @returns     {object}
 * @example
 * ```ts
 * const str = '{"a":10,"b":"function() {}","c":"symbol()","d":"undefined"}'
 * const obj = parseStringify(str);
 * console.log(obj);
 * // {a: 10, b: function() {}, c: Symbol(), d: undefined}
 * ```
 */
export function parseStringify<T = any>(str: string): T {
  try {
    return JSON.parse(str, (key, value) => {
      if (startsWith(value, 'function-')) return new Function(`return ${value.slice(9)}`)()
      if (startsWith(value, 'symbol-')) {
        const match = value.slice(7).match(SymbolRegExp)
        return match ? Symbol(match[1]) : value
      }
      if (startsWith(value, 'undef-')) return undefined
      return restoreValue(value)
    })
  } catch (error) {
    return str as T
  }
}

/**
 * 将对象 ==> 字符串，并解析其中的函数和符号
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-15
 * @param       {object}  obj  - 对象
 * @returns     {string}
 * @example
 * ```ts
 * const obj = {a: 10, b: function() {}, c: Symbol(), d: undefined}
 * const str = toStringify(obj);
 * console.log(str);
 * // '{"a":10,"b":"function() {}","c":"symbol()","d":"undefined"}'
 * ```
 */
export function toStringify<T = any>(obj: T): string {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') return `function-${value.toString()}`
    if (typeof value === 'symbol') return `symbol-${value.toString()}`
    if (value === undefined) return 'undef-'
    return value
  })
}

/**
 * 将小驼峰命名的字符串展开
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-15
 * @param       {string}  str         - 字符串
 * @param       {string}  [sep=' ']   - 分隔符
 * @returns     {string}
 * @example
 * ```ts
 * const str = 'helloWorld';
 * const result = expandCamelCase(str); // 'hello world'
 *
 * const str2 = 'helloWorld expandCamelCase'
 * const result2 = expandCamelCase(str2); // 'hello world expand camel case'
 *
 * const str3 = 'helloWorldExpandCamelCase';
 * const result3 = expandCamelCase(str3, '-'); // 'hello-world-expand-camel-case'
 * ```
 */
export function expandCamelCase(str: string, sep: string = ' '): string {
  return str
    .replace(CamelCaseRegExp, sep + '$1')
    .trim()
    .toLowerCase()
}

/**
 * 将下划线命名的字符串转换成小驼峰命名
 * @deprecated  已废弃，建议使用 _.camelCase
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-15
 * @param       {string}  str  - 字符串
 * @returns     {string}
 * @example
 * ```ts
 * const str = 'hello_world';
 * const result = underlineToCamelCase(str); // 'helloWorld'
 *
 * const str2 = 'hello_World_underline_to_camel_case';
 * const result2 = underlineToCamelCase(str2); // 'helloWorldUnderlineToCamelCase'
 * ```
 */
export const underlineToCamelCase = (str: string): string => {
  return str.replace(UnderlineToCamelCaseRegExp, (_, letter: string) => letter.toUpperCase())
}

/**
 * 保留指定小数位数
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-17
 * @param       {number}  num  - 数字
 * @param       {number}  [digits=2]  - 保留的小数位数
 * @returns     {number}
 * @example
 * ```ts
 * const num = 10.123456;
 * const result = toFixed(num); // 10.12
 *
 * const num2 = 10.123456;
 * const result2 = toFixed(num2, 4); // 10.1234
 * ```
 */
export const toFixed = (num: number, digits: number = 2): number => {
  const strNum = num.toString()
  const index = strNum.indexOf('.')
  if (index === -1) return num
  return Number(strNum.slice(0, index + digits + 1))
}

/**
 * 占位写入模板字符串
 * @author      Yuluo
 * @link        https://github.com/YuluoY
 * @date        2024-10-18
 * @param       {string}  template  - 模板字符串
 * @param       {Record<string, any> | any[]}  data  - 数据
 * @returns     {string}
 * @example
 * ```ts
 * const template = 'Hello, {name}!';
 * const data = { name: 'Yuluo' };
 * const result = fillTemplate(template, data); // 'Hello, Yuluo!'
 *
 * const template2 = 'Hello, {name}! You have {count} new messages.';
 * const data2 = { name: 'Yuluo', count: 5 };
 * const result2 = fillTemplate(template2, data2); // 'Hello, Yuluo! You have 5 new messages.'
 *
 * const template3 = 'Hello, {0}! You have {1} new messages.';
 * const data3 = ['Yuluo', 5];
 * const result3 = fillTemplate(template3, data3); // 'Hello, Yuluo! You have 5 new messages.'
 *
 * const template4 = 'Hello, {name}! You have {1} new messages.';
 * const data4 = { name: 'Yuluo', count: 5 };
 * const result4 = fillTemplate(template4, data4); // 'Hello, Yuluo! You have 5 new messages.'
 * ```
 */
export const fillTemplate = (template: string, data: Record<string, any> | any[]): string => {
  return template.replace(PlaceholderRegExp, (_, key: string) => {
    const index = parseInt(key, 10)
    if (!isNaN(index)) return (data as any[])[index] as string
    return (data as Record<string, any>)[key] as string
  })
}
