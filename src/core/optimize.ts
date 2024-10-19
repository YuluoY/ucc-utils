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
 * 并发队列控制 - 保证并发数量始终是limit个
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-18
 * @param     {Function[] | Promise[]}                 tasks                      任务队列
 * @param     {object}                                 opts                       配置项
 * @param     {number}                                 [opts.limit=3]             最大并发数量，默认为3
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
export const concurRequest = async <T = any>(
  tasks: Function[] | Promise<any>[],
  opts: {
    limit?: number
  } = {}
): Promise<{ success: boolean; value: T | any }[]> => {
  const { limit = 3 } = opts
  tasks = tasks.map((t: any) => (isPromise(t) ? t : Promise.resolve(t)))

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (tasks.length === 0) return resolve([])
    const results = [] as { success: boolean; value: T | any }[]
    let nextIndex = 0
    let count = 0
    const _request = async () => {
      const i = nextIndex++
      const task = tasks[i] as Promise<T>
      try {
        results[i] = { success: true, value: await task }
      } catch (error) {
        results[i] = { success: false, value: error }
      }
    }
    if (nextIndex < tasks.length) _request()
    if (++count === tasks.length) return resolve(results)

    for (let i = 0; i < Math.min(limit, tasks.length); i++) {
      _request()
    }
  })
}
