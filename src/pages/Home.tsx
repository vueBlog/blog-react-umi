import React from 'react';
import ListAll from '@/components/List/ListAll';
import AsideAll from '@/components/Aside/AsideAll';
import styles from './Home.less';

export default (props: any): React.ReactNode => (
  <div className={styles.page_content}>
    <AsideAll className={styles.page_aside} />
    <ListAll className={styles.page_body} props={props} />
  </div>
);
