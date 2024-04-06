/**
 * 多维数组扁平化为一维数组
 * @method flatten
 * @param {T} arr 需要扁平化的数组
 * @returns {T} 返回扁平化后的数组
 */
export const flatten = <T = any>(arr: T[]): T[] =>
  arr.reduce(
    (acc, val) =>
      Array.isArray(val)
        ? acc.concat(flatten(val as any))
        : acc.concat(val as any),
    []
  );

/**
 * 字符串sql转换成数组
 * @method parseSQL
 * @param {string} sql 需要转换的sql
 * @returns {string[]} 返回转换后的数组 二维数组
 */
export const parseSQL = (sql: string): any => {
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
        item.push(null as any);
      } else {
        item.push(logicalOperators[index - 1] as any);
      }
    });
  }

  return assets;
};

/**
 * 扁平路由表转换有层级的路由表
 * @method convertRoutesToLevel
 * @param {T} routes 需要转换的路由表
 * @returns {T} 返回转换后的路由表
 */
export const convertRoutesToLevel = <T = any>(routes: T[]): T[] => {
  return routes
    .map((route: T | any) => {
      if (route.parentId) {
        const pRoute = routes.find(
          (item: T | any) => item.id === route.parentId
        ) as T | any;

        pRoute && Array.isArray(pRoute.children)
          ? pRoute.children.push(route)
          : (pRoute.children = [route]);
      }
      return route;
    })
    .filter((route: any) => !route.parentId) as T[];
};

/**
 * 根据属性对数组分组
 * @param {T[]} array 需要分组的数组
 * @param {string} prop 对某个属性的值进行分组
 * @returns {{[key:string]: T[]}} 根据prop值分组后的对象数组
 */
export const groupByProp = <T = any>(
  array: T[],
  prop: string
): { [key: string]: T[] } | null => {
  if (!array.length) return null;
  return array.reduce((acc: any, item: any) => {
    const key = item[prop];
    (acc[key] || (acc[key] = [])).push(item);
    return acc;
  }, {});
};
