import React from 'react';
import AsideAll from '@/components/Aside/AsideAll';

import styles from './index.less';

const Layout = ({ children }: { children: any }) => (
  <div className={styles.page_content}>
    <div className={styles.page_aside}>
      <AsideAll />
    </div>
    <div className={styles.page_body}>{children}</div>
  </div>
);

export default Layout;
