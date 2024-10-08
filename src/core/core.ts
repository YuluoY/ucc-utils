import { cloneDeep } from 'lodash'
import { ConvertRoutesToLevelOptions } from './types/core'
import { isStringArray, isStringFunction, isStringNumber, isStringObject } from './judge'
import {
  AddQuotesToPropsRegExp,
  ReplaceArrowFuncs2RegExp,
  ReplaceArrowFuncsRegExp,
  ReplaceBoolsRegExp,
  ReplaceFuncsRegExp,
  ReplaceInfsRegExp,
  ReplaceNaNsRegExp,
  ReplaceNullsRegExp,
  ReplaceUndefsRegExp,
  RplaceArrRegExp,
  TrimCRRegExp,
  TrimNLRegExp,
  TrimSpaceRegExp,
  TrimTabRegExp,
  TrimWhitespaceRegExp,
  UpperCaseRegExp
} from './regExp'

/**
 * window对象 - 兼容
 * @author  Yuluo  {@link https://github.com/YuluoY}
 * @date    2024-08-24
 * @constant {Window | null} root
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          去掉空格后的字符串
 * @example
 * ```ts
 * const str = ' 123 456 789  ';
 * trimSpace(str); // '123456789'
 * ```
 */
export const trimSpace = (str: string): string => str.replace(TrimSpaceRegExp, '')

/**
 * 去掉字符串中的换行符
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          去掉换行符后的字符串
 * @example
 * ```ts
 * const str = '123\n456\n789';
 * trimNL(str); // '123456789'
 * ```
 */
export const trimNL = (str: string): string => str.replace(TrimNLRegExp, '')

/**
 * 去掉字符串中的回车符
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          去掉回车符后的字符串
 * @example
 * ```ts
 * const str = '123\r456\r789';
 * trimCR(str); // '123456789'
 * ```
 */
export const trimCR = (str: string): string => str.replace(TrimCRRegExp, '')

/**
 * 去掉字符串中的制表符
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          去掉制表符后的字符串
 * @example
 * ```ts
 * const str = '123\t456\t789';
 * trimTabForString(str); // '123456789'
 * ```
 */
export const trimTab = (str: string): string => str.replace(TrimTabRegExp, '')

/**
 * 去掉字符串中的空格、换行符、回车符、制表符
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          去掉空格、换行符、回车符、制表符后的字符串
 * @example
 * ```ts
 * const str = ' 123 \n 456 \r 789 \t ';
 * trimWhitespace(str); // '123456789'
 * ```
 */
export const trimWhitespace = (str: string): string => str.replace(TrimWhitespaceRegExp, '')

/**
 * 给字符串中对象属性名加双引号
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          给字符串中对象属性名加双引号后的字符串
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
 * 将数组字符串转换为数组
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   数组字符串
 * @returns   {string}          数组
 * @example
 * ```ts
 * const str = '[1,2,3,4,5]';
 * arrayStrToArr(str);
 * console.log(result); // [1,2,3,4,5]
 * ```
 */
export const replaceArr = (str: string): string => str.replace(RplaceArrRegExp, '$1')

/**
 * 将所有'null'转换为null
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          将所有'null'转换为null后的字符串
 * @example
 * ```ts
 * const str = 'null';
 * console.log(str); // 'null'
 * replaceNulls(str); // null
 */
export const replaceNulls = (str: string): string => str.replace(ReplaceNullsRegExp, '$1')

/**
 * 将所有'undefined'转换为undefined
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          将所有'undefined'转换为undefined后的字符串
 * @example
 * ```ts
 * const str = 'undefined';
 * console.log(str); // 'undefined'
 * replaceUndefs(str); // undefined
 */
export const replaceUndefs = (str: string): string => str.replace(ReplaceUndefsRegExp, '$1')

/**
 * 将所有'NaN'转换为NaN
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          将所有'NaN'转换为NaN后的字符串
 * @example
 * ```ts
 * const str = 'NaN';
 * console.log(str); // 'NaN'
 * replaceNaNs(str); // NaN
 */
export const replaceNaNs = (str: string): string => str.replace(ReplaceNaNsRegExp, '$1')

/**
 * 将所有'Infinity'转换为Infinity
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          将所有'Infinity'转换为Infinity后的字符串
 * @example
 * ```ts
 * const str = 'Infinity';
 * console.log(str); // 'Infinity'
 * replaceInfs(str); // Infinity
 * ```
 */
export const replaceInfs = (str: string): string => str.replace(ReplaceInfsRegExp, '$1')

/**
 * 将所有'false' or 'true' 转换为boolean
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   字符串
 * @returns   {string}          将所有'false' or 'true'  转换为boolean后的字符串
 * @example
 * ```ts
 * const str = 'false';
 * console.log(str); // 'false'
 * replaceBools(str); // false
 * ```
 */
export const replaceBools = (str: string): string => str.replace(ReplaceBoolsRegExp, '$1')

/**
 * 将function字符串转换为函数
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   函数字符串
 * @returns   {string}          函数
 * @example
 * ```ts
 * const str = 'function() { return 1; }';
 * const result = replaceFuncs(str);
 * const fn = new Function(`return ${result}`)();
 * console.log(fn()); // 1
 * ```
 */
export const replaceFuncs = (str: string): string => str.replace(ReplaceFuncsRegExp, '$1')

/**
 * 将'() => {}' 字符串转换为函数
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   函数字符串
 * @returns   {string}          函数
 * @example
 * ```ts
 * const str = '() => { return 1 }';
 * const result = replaceArrowFuncs(str);
 * const fn = new Function(`return ${result}`)();
 * console.log(fn()); // 1
 * ```
 */
export const replaceArrowFuncs = (str: string): string => str.replace(ReplaceArrowFuncsRegExp, '$1')

/**
 * 将所有的'_=>{}' 字符串转换为函数
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @param     {string}    str   函数字符串
 * @returns   {string}          函数
 * @example
 * ```ts
 * const str = '_=>{ return 1 }';
 * const result = replaceArrowFuncs2(str);
 * const fn = new Function(`return ${result}`)();
 * console.log(fn()); // 1
 * ```
 */
export const replaceArrowFuncs2 = (str: string): string => str.replace(ReplaceArrowFuncs2RegExp, '$1')

/**
 * 扁平路由表转换有层级的路由表
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-08-29
 * @param     {T}                             routes                        需要转换的路由表
 * @param     {ConvertRoutesToLevelOptions}   opts                          配置项
 * @param     {string}                        [opts.fld= 'id']              路由表中的id字段名，默认为id
 * @param     {string}                        [opts.glFld= 'parentId']      路由表中的父级id字段名，默认为parentId
 * @param     {string}                        [opts.childFld= 'children']   路由表中的子级字段名，默认为children
 * @param     {boolean}                       [opts.isJudgeType= true]      是否判断类型，默认为true
 * @param     {boolean}                       [opts.isChangeOwner= true]    是否改变原数组，默认为true
 * @returns   {T}                                                           返回转换后的路由表
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-08-24
 * @template    {T}
 * @param       {string}        str       JSON 字符串
 * @param       {T=}            defVal    默认返回值
 * @returns     {T}
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
 * 英文首字母大写
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-08-24
 * @param     {string}      str       英文字符串
 * @returns   {string}
 * @example
 * ```js
 *  capitalizeFirstLetter('hello world')  // Hello World
 * ```
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''
  return str.replace(UpperCaseRegExp, (match) => match.toUpperCase())
}

/**
 * 获取类型
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {Record<string, any>}           obj             - 目标对象
 * @param       {string | string[]}             path            - 属性路径，支持点分隔的字符串或数组
 * @param       {any}                           val             - 要设置的值
 * @param       {string}                        [splitter='.']  - 分隔符，默认为 '.'
 * @returns     {[Record<string, any>, string]}                 修改后的对象和最后一个属性的 key
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * setDeepValue(obj, 'a.b.c', 2) // obj = { a: { b: { c: 2 } } }
 * ```
 */
export function setDeepValue<T = any>(
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

  return [active, lastKey] // 返回修改后的对象和最后一个 key
}

/**
 * 获取对象属性值（支持深度路径）
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {Record<string, any>} obj             - 目标对象
 * @param       {string | string[]}   path            - 属性路径，支持点分隔的字符串或数组
 * @param       {string}              [splitter='.']  - 分隔符，默认为 '.'
 * @returns     {any}                                 - 属性值
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } }
 * getDeepValue<number>(obj, 'a.b.c') // 1
 *
 * const obj2 = { a: { b: { c: 1 } } }
 * getDeepValue(obj, 'a.b.c.d') // undefined
 * ```
 */
export function getDeepValue<T = any>(obj: Record<string, any>, path: string | string[], splitter: string = '.'): T {
  if (typeof path === 'string') {
    path = path.split(splitter)
  }
  return path.reduce((o, k) => (o || {})[k], obj) as T
}

/**
 * watch 监听一个函数返回为 true 的时机，并执行回调 - 有执行间隔和次数限制
 * @author      Yuluo  {@link https://github.com/YuluoY}
 * @date        2024-09-14
 * @param       {() => Promise<boolean> | boolean}    fn                  - 监听的函数
 * @param       {() => Promise<void> | void}          callback            - 回调函数
 * @param       {object}                              [options]           - 配置项
 * @param       {number}                              [options.delay]     - 执行间隔，单位毫秒，默认 100
 * @param       {number}                              [options.limit]     - 执行次数限制，默认 1
 * @param       {Record<string, any>}                 [options.ctx]       - 回调函数的 this 上下文
 * @returns     {() => void}                                              - 取消监听的函数
 * @example
 * ```ts
 * const cancel = watchFn(() => isReady(), () => {
 *   console.log('isReady')
 * }, { delay: 100, limit: 1, ctx: this })
 * // 取消监听
 * cancel()
 * ```
 */
export function watchFn(
  fn: () => Promise<boolean> | boolean,
  callback: () => Promise<void> | void,
  options: Partial<{ delay: number; limit: number; ctx: Record<string, any> }> = {}
): () => void {
  const { delay = 100, limit = 1, ctx = null } = options
  let count = 0
  const interval = setInterval(async () => {
    if (await fn()) {
      ctx ? await callback.call(ctx) : await callback()
      count++
      if (count >= limit) {
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
 * @author      Yuluo  {@link https://github.com/YuluoY}
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
