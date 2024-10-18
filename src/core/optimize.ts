/**
 * 性能优化函数
 */

import { isPromise } from './judge'

/**
 * 浏览器空闲时间执行
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-08-24
 * @param     {Function}    fn     回调函数
 * @returns   {number}
 * @example
 * ```js
 *  idleCallback(() => console.log('hello world'))
 * ```
 */
export const idleCallback = (fn: Function): number => {
  return window.requestIdleCallback(async (idle: IdleDeadline) => {
    while (idle.timeRemaining() > 0) fn && typeof fn === 'function' && (await fn())
  })
}

/**
 * 在浏览器空闲时执行任务队列 - 可以传递一个WeakMap，将会收取所有id和任务
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-08-24
 * @param     {Function[] | Function}                 task        任务队列
 * @param     {WeakMap<Function, number>}             idleMap     已请求的空闲回调ID
 * @returns   {void}
 * @example
 * ```js
 *  const idleMap = new WeakMap()
 *  idleTaskQueue([() => console.log('hello'), () => console.log('world')], idleMap)
 * ```
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
 * 并发控制
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-18
 * @param     {Function[] | Promise[]}                 tasks                  任务队列
 * @param     {Object}                                 opts                   配置项
 * @param     {number}                                 [opts.limit=1]         最大并发数量
 * @param     {boolean}                                [opts.isAsync=true]    是否异步执行
 * @param     {'all' | 'allSettled' | 'race'}          [opts.mode='all']      并发模式
 * @returns   {Promise<void>}
 * @example
 * ```ts
 * const tasks = [() => console.log('hello'), () => console.log('world')]
 * await toConcurrency(tasks) // hello world
 *
 * const tasks = [Promise.resolve('hello'), Promise.resolve('world')]
 * await toConcurrency(tasks) // hello world
 * ```
 */
export const toConcurrency = async <T = any>(
  tasks: Function[] | Promise<any>[],
  opts: {
    limit?: number
    isAsync?: boolean
    mode?: 'all' | 'race' | 'allSettled'
  } = {}
): Promise<T[]> => {
  const { limit = 1, isAsync = true, mode = 'all' } = opts

  const result = [] as T[]
  if (!tasks || tasks.length === 0) return tasks as T[]

  await inner(getTaskGroup())

  async function inner(arr: any[]) {
    if (arr.length === 0) return
    if (isAsync) {
      ;(Promise[mode] as any)(arr).then((res: any[]) => {
        result.push(...res)
        inner(getTaskGroup())
      })
    } else {
      result.push(...(await (Promise[mode] as any)(arr)))
      await inner(getTaskGroup())
    }
  }

  function getTaskGroup(): Promise<any>[] {
    return tasks.length > 0 ? tasks.slice(0, limit).map((t: any) => (isPromise(t) ? t : Promise.resolve(t()))) : []
  }

  return result
}
