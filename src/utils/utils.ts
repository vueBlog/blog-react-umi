/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import pathToRegexp from 'path-to-regexp';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

/**
 * 某个path是否属于列表中的一个连接，比如：
 * list: ['/user/login', '/home', '/list', '/detail/:id', '/']
 * path1: '/detail/1'
 * path2: '/detail'
 * isIncludesPath(list, path1) => true
 * isIncludesPath(list, path2) => false
 */
export function isIncludesPath(list: string[], path: string): boolean {
  let isFlag: boolean = false;
  for (let index = 0, { length } = list; index < length; index += 1) {
    const regexp = pathToRegexp(list[index]);
    if (regexp.test(path)) {
      isFlag = true;
      break;
    }
  }
  return isFlag;
}
