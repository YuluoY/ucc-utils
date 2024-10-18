/**
 * 正则：去掉字符串中的空格
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = ' 123 456 789  ';
 * const result = str.replace(TrimSpaceRegExp, '');
 * console.log(result); // '123456789'
 * ```
 */
export const TrimSpaceRegExp = /\s+/g as Readonly<RegExp>

/**
 * 正则：去掉字符串中的换行符
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '123\n456\n789';
 * const result = str.replace(TrimNLRegExp, '');
 * console.log(result); // '123456789'
 * ```
 */
export const TrimNLRegExp = /\n+/g as Readonly<RegExp>

/**
 * 正则：去掉字符串中的回车符
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '123\r456\r789';
 * const result = str.replace(TrimCRRegExp, '');
 * console.log(result); // '123456789'
 * ```
 */
export const TrimCRRegExp = /\r+/g as Readonly<RegExp>

/**
 * 正则：去掉字符串中的制表符
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '123\t456\t789';
 * const result = str.replace(TrimTabRegExp, '');
 * console.log(result); // '123456789'
 * ```
 */
export const TrimTabRegExp = /\t+/g as Readonly<RegExp>

/**
 * 正则：去掉字符串中的空格、换行符、回车符、制表符
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = ' 123 \n 456 \r 789 \t ';
 * const result = str.replace(TrimWhitespaceRegExp, '');
 * console.log(result); // '123456789'
 * ```
 */
export const TrimWhitespaceRegExp = /\s+/g as Readonly<RegExp>

/**
 * 正则：给字符串中对象属性名加双引号
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'a:1,b:2,c:3';
 * const result = str.replace(AddQuotesToPropsRegExp, '"$1":$2');
 * console.log(result); // '"a":1,"b":2,"c":3'
 *
 * const str2 = '{a:1,b:2,c:3}';
 * const result2 = str2.replace(AddQuotesToPropsRegExp, '"$1":$2');
 * console.log(result2); // '{"a":1,"b":2,"c":3}'
 * ```
 */
export const AddQuotesToPropsRegExp = /(\w+):()/g as Readonly<RegExp>

/**
 * 正则：英文首字母大写
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'hello world';
 * const result = str.replace(UpperCaseRegExp, (match) => match.toUpperCase());
 * console.log(result); // Hello world
 * ```
 */
export const UpperCaseRegExp = /\b\w/g as Readonly<RegExp>

/**
 * 正则：提取Symbol中的字符串
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-15
 * @constant
 * @example
 * ```ts
 * const str = 'Symbol("hello world")';
 * const result = str.replace(SymbolRegExp, '$1');
 * console.log(result); // hello world
 *
 * const str2 = 'Symbol("hello world") Symbol("hello world")';
 * const result2 = str2.replace(SymbolRegExp, '$1');
 * console.log(result2); // hello world hello world
 * ```
 */
export const SymbolRegExp = /Symbol\("([^"]*)"\)/g as Readonly<RegExp>

/**
 * 正则：展开小驼峰命名的字符串
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-15
 * @constant
 * @example
 * ```ts
 * const str = 'helloWorld';
 * const result = str.replace(CamelCaseRegExp, ' $1');
 * console.log(result); // hello world
 *
 * const str2 = 'helloWorld helloWorld';
 * const result2 = str2.replace(CamelCaseRegExp, ' $1');
 * console.log(result2); // hello world hello world
 * ```
 */
export const CamelCaseRegExp = /([A-Z])/g as Readonly<RegExp>

/**
 * 正则：将下划线命名的字符串转换为小驼峰命名
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-15
 * @constant
 * @example
 * ```ts
 * const str = 'hello_world';
 * const result = str.replace(UnderlineToCamelCaseRegExp, (_, letter) => letter.toUpperCase());
 * console.log(result); // helloWorld
 *
 * const str2 = 'Underline_to_camel_case';
 * const result2 = str2.replace(UnderlineToCamelCaseRegExp, (_, letter) => letter.toUpperCase());
 * console.log(result2); // underlineToCamelCase
 * ```
 */
export const UnderlineToCamelCaseRegExp = /_(\w)/g as Readonly<RegExp>

/**
 * 正则：模板字符串占位替换 - {}
 * @author    Yuluo
 * @link      https://github.com/YuluoY
 * @date      2024-10-18
 * @constant
 * @example
 * ```ts
 * const template = 'Hello, {name}! You are {age} years old.';
 * const result = template.replace(PlaceholderRegExp, (_, key: string) => {/\{(\d+)\}/g
 *  const index = parseInt(key, 10)
 *  return Array.isArray(data) ? data[index] : data[key]
 * })
 * console.log(result); // Hello, world! You are 18 years old.
 * ```
 */
export const PlaceholderRegExp = /\{(\d+)\}/g as Readonly<RegExp>
