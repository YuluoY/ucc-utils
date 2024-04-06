"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCookieValid = exports.getAllCookies = exports.removeCookie = exports.setCookie = exports.getCookie = void 0;
/**
 * 获取cookie
 * @method getCookie
 * @param {string} name cookie存储的key值
 * @returns {string} cookie的值
 */
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return parts.pop()?.split(";").shift();
    return "";
};
exports.getCookie = getCookie;
/**
 * 设置cookie
 * @method setCookie
 * @param {string} name cookie存储的key值
 * @param {string} value cookie的值
 * @param {number} options.expires 过期时间，单位为天
 * @param {string} options.path cookie的路径
 * @param {string} options.domain cookie的域名
 * @param {boolean} options.secure 是否使用https
 * @param {'lax' | 'strict' | 'none'} options.sameSite 是否使用同源策略
 * @returns {void}
 * @example setCookie("name", "value", { expires: 30, path: "/", domain: "example.com", secure: true, sameSite: "lax" });
 */
const setCookie = (name, value, options) => {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    options.expires = options.expires || 7; // 默认7天过期
    if (options.expires) {
        const d = new Date();
        d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieText += `; expires=${d.toUTCString()}`;
    }
    if (options.path)
        cookieText += `; path=${options.path}`;
    if (options.domain)
        cookieText += `; domain=${options.domain}`;
    if (options.secure)
        cookieText += "; secure";
    if (options.sameSite)
        cookieText += `; samesite=${options.sameSite}`;
    document.cookie = cookieText;
};
exports.setCookie = setCookie;
/**
 * 删除cookie
 * @method removeCookie
 * @param {string} name cookie存储的key值
 * @param {string} path cookie的路径
 * @param {string} domain cookie的域名
 * @returns {void}
 * @example removeCookie("name", "/", "example.com");
 */
const removeCookie = (name, path, domain) => {
    (0, exports.setCookie)(name, "", { expires: -1, path, domain });
};
exports.removeCookie = removeCookie;
/**
 * 获取所有cookie
 * @method getAllCookies
 * @returns {Record<string, string>} 所有cookie的键值对
 */
const getAllCookies = () => {
    const cookies = {};
    document.cookie.split(";").forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookies[name.trim()] = decodeURIComponent(value);
    });
    return cookies;
};
exports.getAllCookies = getAllCookies;
/**
 * 验证cookie是否有效
 * @method isCookieValid
 * @param {string} name cookie存储的key值
 * @returns {boolean} cookie是否有效
 */
const isCookieValid = (name) => {
    const cookieValue = (0, exports.getCookie)(name);
    return !!cookieValue;
};
exports.isCookieValid = isCookieValid;
