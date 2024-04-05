/**
 * 获取sessionStorage
 * @method getSessionStorage
 * @param {string} key 键
 * @returns {T | null} 值
 */
export const getSessionStorage = <T>(key: string): T | null => {
  const value = sessionStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return null;
};

/**
 * 设置sessionStorage
 * @method setSessionStorage
 * @param {string} key 键
 * @param {any} value 值
 * @returns {void}
 */
export const setSessionStorage = (key: string, value: any): void => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 删除sessionStorage
 * @method removeSessionStorage
 * @param {string} key 键
 * @returns {void}
 */
export const removeSessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};
