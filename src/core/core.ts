/**
 * window对象 - 兼容
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
 * 多维数组扁平化为一维数组
 * @param     {T}     arr     需要扁平化的数组
 * @returns   {T}             返回扁平化后的数组
 */
export const flatten = <T = any>(arr: T[]): T[] =>
  arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flatten(val as any)) : acc.concat(val as any)), [])

/**
 * 扁平路由表转换有层级的路由表
 * @param     {T}     routes    需要转换的路由表
 * @returns   {T}               返回转换后的路由表
 */
export const convertRoutesToLevel = <T = any>(routes: T[]): T[] => {
  return routes
    .map((route: T | any) => {
      if (route.parentId) {
        const pRoute = routes.find((item: T | any) => item.id === route.parentId) as T | any
        pRoute && Array.isArray(pRoute.children) ? pRoute.children.push(route) : (pRoute.children = [route])
      }
      return route
    })
    .filter((route: any) => !route.parentId) as T[]
}

/**
 * 根据属性对数组分组
 * @param       {T[]}                     array     需要分组的数组
 * @param       {string}                  prop      对某个属性的值进行分组
 * @returns     {{[key:string]: T[]}}               根据prop值分组后的对象数组
 */
export const groupByProp = <T = any>(array: T[], prop: string): { [key: string]: T[] } | null => {
  if (!array.length) return null
  return array.reduce((acc: any, item: any) => {
    const key = item[prop]
    ;(acc[key] || (acc[key] = [])).push(item)
    return acc
  }, {})
}

/**
 * 浏览器空闲时间执行
 * @param     {Function}    fn     回调函数
 * @returns   {number}
 */
export const idleCallback = (fn: Function): number => {
  return window.requestIdleCallback(async (idle: IdleDeadline) => {
    while (idle.timeRemaining() > 0) fn && typeof fn === 'function' && (await fn())
  })
}

/**
 * 在浏览器空闲时执行任务队列 - 可以传递一个WeakMap，将会收取所有id和任务
 * @param   {Function[] | Function}                 task        任务队列
 * @param   {WeakMap<Function, number>}             idleMap     已请求的空闲回调ID
 */
export const idleTaskQueue = (
  task: Function[] | Function,
  idleMap: WeakMap<Function, number> = new WeakMap()
): void => {
  if (!task) return task
  if (Array.isArray(task)) idleTaskQueue(task, idleMap)
  else {
    const idleId = window.requestIdleCallback(async (idle) => {
      const isArr = Array.isArray(task)
      const fn = isArr ? task.shift() : task
      while (idle.timeRemaining() > 0) await fn()
      if (isArr && task.length > 0) idleTaskQueue(task, idleMap)
    })
    idleMap.set(task, idleId)
  }
}

/**
 * 解析 JSON 字符串
 * @template {T}
 * @param       {string}        str       JSON 字符串
 * @param       {T=}            defVal    默认返回值
 * @returns     {T}
 */
export const parseJSON = <T = any>(str: string, defVal: T = {} as any): T => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return defVal
  }
}

/**
 * 英文首字母大写
 * @param     {string}      str       英文字符串
 * @returns   {string}
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
 * @param       {any}           val       需要获取类型的值
 * @return      {string}
 */
export const getType = (val: any): string => Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
