/**
 * windows函数 - 兼容性处理
 */
// @ts-nocheck
;((window, undefined) => {
  handleRequestAnimationFrame()
  handleRequestIdleCallback()

  /**
   * window.requestAnimationFrame - 兼容性处理
   */
  function handleRequestAnimationFrame() {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (function () {
        return (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60)
          }
        )
      })()
    }
  }

  /**
   * window.requestIdleCallback - 兼容性处理
   *
   * ```js
   *  window.requestIdleCallback((idle) =>
   *  {
   *    while (idle.timeRemaining() > 0)
   *    {
   *      // do something
   *    }
   *  })
   * ```
   */
  function handleRequestIdleCallback() {
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = function (callback) {
        // 模拟 idleCallback 的时间限制
        return setTimeout(function () {
          const start = Date.now()
          callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          })
        }, 1)
      }
    }

    if (!window.cancelIdleCallback) {
      window.cancelIdleCallback = function (id) {
        clearTimeout(id)
      }
    }
  }
})(window, undefined)
