interface footerLinkTS {
  key?: string;
  title: string;
  href: string;
  blankTarget?: boolean;
}

/**
 * 友情链接
 * 不想展示友情链接设置为：false
 */
export const footerLink: footerLinkTS[] | false = [
  {
    key: 'fxss5201',
    title: 'fxss5201',
    href: 'https://github.com/fxss5201',
    blankTarget: true,
  },
  {
    key: 'vueBlog',
    title: 'vueBlog',
    href: 'https://github.com/vueBlog',
    blankTarget: true,
  },
  {
    key: 'SCDN',
    title: 'SCDN',
    href: 'https://blog.csdn.net/fxss5201',
    blankTarget: true,
  },
];

/**
 * 座右铭
 * 不想展示座右铭设置为：false
 */
export const motto: string | false = '多看代码，多看书，付出总会有收获的。';

/**
 * 作者信息
 * 必须设置
 */
interface authorTS {
  name: string;
  href: string;
}
export const author: authorTS = {
  name: '樊小书生',
  href: 'https://github.com/fxss5201',
};

/**
 * 备案信息
 * 必须设置
 */
interface recordTS {
  name: string;
  href: string;
}
export const record: recordTS = {
  name: '晋ICP备17012454号',
  href: 'https://beian.miit.gov.cn/#/Integrated/index',
};
