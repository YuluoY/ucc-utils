'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.removeLocalStorage = exports.setLocalStorage = exports.getLocalStorage = void 0
/**
 * 获取localStorage的值
 * @method getLocalStorage
 * @param {string} key localStorage的key
 * @returns {any} localStorage的值
 */
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (!value) {
    return null
  }
  const obj = JSON.parse(value)
  const { expires, value: val } = obj
  const nowTime = new Date().getTime()
  if (nowTime > new Date(expires).getTime()) {
    localStorage.removeItem(key)
    return null
  }
  return val
}
exports.getLocalStorage = getLocalStorage
/**
 * 设置localStorage的值
 * @method setLocalStorage
 * @param {string} key localStorage的key
 * @param {any} value localStorage的值
 * @params {object} options 配置项
 * @param {number} options.expires 过期时间，单位：天
 * @returns {void}
 */
const setLocalStorage = (
  key,
  value,
  {
    expires = 7 // 过期时间，单位：天
  }
) => {
  const expiresTime = new Date().getTime() + expires * 24 * 60 * 60 * 1000
  const expiresStr = new Date(expiresTime).toUTCString()
  const obj = {
    value,
    expires: expiresStr
  }
  localStorage.setItem(key, JSON.stringify(obj))
}
exports.setLocalStorage = setLocalStorage
/**
 * 删除localStorage的值
 * @method removeLocalStorage
 * @param {string} key localStorage的key
 * @returns {void}
 */
const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}
exports.removeLocalStorage = removeLocalStorage
