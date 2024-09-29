/**
 * 正则：去掉字符串中的空格
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
 * 正则：正则：将数组字符串转换为数组
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '[1,2,3,4,5]';
 * const result = str.replace(RplaceArrRegExp, '$1');
 * console.log(result); // [1,2,3,4,5]
 * ```
 */
export const RplaceArrRegExp = /"(\[.*?\])"/g as Readonly<RegExp>

/**
 * 正则：将'null' or "null" 转换为null
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'null';
 * const result = str.replace(ReplaceNullsRegExp, '$1');
 * console.log(result); // null
 *
 * const str2 = "null"
 * const result2 = str2.replace(ReplaceNullsRegExp, '$1');
 * console.log(result2); // null
 * ```
 */
export const ReplaceNullsRegExp = /"(null)"/g as Readonly<RegExp>

/**
 * 正则：将'undefined' or "undefined" 转换为undefined
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'undefined';
 * const result = str.replace(ReplaceUndefsRegExp, '$1');
 * console.log(result); // undefined
 *
 * const str2 = "undefined"
 * const result2 = str2.replace(ReplaceUndefsRegExp, '$1');
 * console.log(result2); // undefined
 * ```
 */
export const ReplaceUndefsRegExp = /"(undefined)"/g as Readonly<RegExp>

/**
 * 正则：将'NaN' or "NaN" 转换为NaN
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'NaN';
 * const result = str.replace(ReplaceNaNsRegExp, '$1');
 * console.log(result); // NaN
 *
 * const str2 = "NaN"
 * const result2 = str2.replace(ReplaceNaNsRegExp, '$1');
 * console.log(result2); // NaN
 * ```
 */
export const ReplaceNaNsRegExp = /"(NaN)"/g as Readonly<RegExp>

/**
 * 正则：将'Infinity' or "Infinity" 转换为Infinity, 将'-Infinity' or "-Infinity" 转换为-Infinity
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'Infinity';
 * const result = str.replace(ReplaceInfsRegExp, '$1');
 * console.log(result); // Infinity
 *
 * const str2 = "-Infinity"
 * const result2 = str2.replace(ReplaceInfsRegExp, '$1');
 * console.log(result2); // -Infinity
 * ```
 */
export const ReplaceInfsRegExp = /"(-?Infinity)"/g as Readonly<RegExp>

/**
 * 正则：将'true' or "true" 转换为true, 将'false' or "false" 转换为false
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'true';
 * const result = str.replace(ReplaceBoolsRegExp, '$1');
 * console.log(result); // true
 *
 * const str2 = "false"
 * const result2 = str2.replace(ReplaceBoolsRegExp, '$1');
 * console.log(result2); // false
 * ```
 */
export const ReplaceBoolsRegExp = /"(true|false)"/g as Readonly<RegExp>

/**
 * 正则：将'function(){}' or 'function(){}' 转换为function(){};
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = 'function(){ console.log("hello world"); }';
 * const result = str.replace(ReplaceFuncsRegExp, '$1');
 * const fn = new Function(`return ${result}`)();
 * fn(); // hello world
 * ```
 */
export const ReplaceFuncsRegExp = /"(function\s*\([^)]*\)\s*{[^}]*})"/g as Readonly<RegExp>

/**
 * 正则：将'()=>{}' or '()=>{}' 转换为()=>{};
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '()=>{ console.log("hello world"); }';
 * const result = str.replace(ReplaceArrowFuncsRegExp, '$1');
 * const fn = new Function(`return ${result}`)();
 * fn(); // hello world
 * ```
 */
export const ReplaceArrowFuncsRegExp = /"(\(\s*\)\s*=>\s*{[^}]*})"/g as Readonly<RegExp>

/**
 * 正则：将'_=>{}' or '_=>{}' 转换为_=>{};
 * @author    Yuluo  {@link https://github.com/YuluoY}
 * @date      2024-09-28
 * @constant
 * @example
 * ```ts
 * const str = '_=>{ console.log("hello world"); }';
 * const result = str.replace(ReplaceArrowFuncs2RegExp, '$1');
 * const fn = new Function(`return ${result}`)();
 * fn(); // hello world
 * ```
 */
export const ReplaceArrowFuncs2RegExp = /"(_\s*=>\s*{[^}]*})"/g as Readonly<RegExp>

/**
 * 正则：英文首字母大写
 * @author    Yuluo  {@link https://github.com/YuluoY}
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
