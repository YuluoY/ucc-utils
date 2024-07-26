"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupByProp = exports.convertRoutesToLevel = exports.parseSQL = exports.flatten = void 0;
/**
 * 多维数组扁平化为一维数组
 * @param       {T}         arr     需要扁平化的数组
 * @returns     {T}                 返回扁平化后的数组
 */
const flatten = (arr) => arr.reduce((acc, val) => Array.isArray(val)
    ? acc.concat((0, exports.flatten)(val))
    : acc.concat(val), []);
exports.flatten = flatten;
/**
 * 字符串sql转换成数组
 * @param       {string}    sql     需要转换的sql
 * @returns     {string[]}          返回转换后的数组 二维数组
 */
const parseSQL = (sql) => {
    const regex = /(\w+)\s*([=<>]+)\s*('[^']*'|[0-9]+|\w+)/g;
    let match;
    const assets = [];
    while ((match = regex.exec(sql)) !== null) {
        const [, key, operator, value] = match;
        assets.push([key, operator, value]);
    }
    // 将sql中的逻辑运算符提取出来
    const logicalOperators = sql.match(/\b(AND|OR)\b/gi);
    if (logicalOperators && logicalOperators.length) {
        assets.forEach((item, index) => {
            if (index === 0) {
                item.push(null);
            }
            else {
                item.push(logicalOperators[index - 1]);
            }
        });
    }
    return assets;
};
exports.parseSQL = parseSQL;
/**
 * 扁平路由表转换有层级的路由表
 * @method convertRoutesToLevel
 * @param {T} routes 需要转换的路由表
 * @returns {T} 返回转换后的路由表
 */
const convertRoutesToLevel = (routes) => {
    return routes
        .map((route) => {
        if (route.parentId) {
            const pRoute = routes.find((item) => item.id === route.parentId);
            pRoute && Array.isArray(pRoute.children)
                ? pRoute.children.push(route)
                : (pRoute.children = [route]);
        }
        return route;
    })
        .filter((route) => !route.parentId);
};
exports.convertRoutesToLevel = convertRoutesToLevel;
/**
 * 根据属性对数组分组
 * @param {T[]} array 需要分组的数组
 * @param {string} prop 对某个属性的值进行分组
 * @returns {{[key:string]: T[]}} 根据prop值分组后的对象数组
 */
const groupByProp = (array, prop) => {
    if (!array.length)
        return null;
    return array.reduce((acc, item) => {
        const key = item[prop];
        (acc[key] || (acc[key] = [])).push(item);
        return acc;
    }, {});
};
exports.groupByProp = groupByProp;
