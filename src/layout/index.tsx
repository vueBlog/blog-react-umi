import React from 'react';
import AsideAll from '@/components/Aside/AsideAll';
import classNames from 'classnames';
import { BackTop } from 'antd';

import styles from './index.less';

const Layout = ({ children }: { children: any }) => (
  <div className={styles.page_content}>
    <div className={styles.page_aside}>
      <AsideAll />
    </div>
    <div className={classNames(styles.page_body)}>{children}</div>
    <BackTop />
  </div>
);

export default Layout;
