/**
 * 性能优化函数
 */

/**
 * 浏览器空闲时间执行
 * @author    Yuluo
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
