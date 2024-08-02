'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.removeSessionStorage = exports.setSessionStorage = exports.getSessionStorage = void 0
/**
 * 获取sessionStorage
 * @method getSessionStorage
 * @param {string} key 键
 * @returns {T | null} 值
 */
const getSessionStorage = (key) => {
  const value = sessionStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return null
}
exports.getSessionStorage = getSessionStorage
/**
 * 设置sessionStorage
 * @method setSessionStorage
 * @param {string} key 键
 * @param {any} value 值
 * @returns {void}
 */
const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}
exports.setSessionStorage = setSessionStorage
/**
 * 删除sessionStorage
 * @method removeSessionStorage
 * @param {string} key 键
 * @returns {void}
 */
const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key)
}
exports.removeSessionStorage = removeSessionStorage
