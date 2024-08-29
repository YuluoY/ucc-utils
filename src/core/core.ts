import { cloneDeep } from 'lodash'
import { ConvertRoutesToLevelOptions } from './types/core'

/**
 * window对象 - 兼容
 * @author  Yuluo
 * @date    2024-08-24
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
 * 扁平路由表转换有层级的路由表
 * @author    Yuluo
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
 * ```js
 *   const routes = [
 *     { id: 1, pid: 0, name: 'home' },
 *     { id: 2, pid: 1, name: 'home1' },
 *     { id: 3, pid: 1, name: 'home2' },
 *     { id: 4, pid: 2, name: 'home3' },
 *   ]
 *   const result = convertRoutesToLevel(routes, { fld: 'id', glFld: 'pid', childFld: 'children' })
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
 * @author    Yuluo
 * @date      2024-08-24
 * @param     {string}      str       英文字符串
 * @returns   {string}
 * @example
 * ```js
 *  capitalizeFirstLetter('hello world')  // Hello world
 * ```
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''
  const reg = /\b\w/g
  return (() => {
    return str.replace(reg, (match) => match.toUpperCase())
  })()
}

/**
 * 获取类型
 * @author      Yuluo
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
