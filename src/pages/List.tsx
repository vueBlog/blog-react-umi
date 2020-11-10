import React from 'react';
import ListAll from '@/components/List/ListAll';
import AsideAll from '@/components/Aside/AsideAll';
import ColumnDetail from '@/components/Column/Column';
import styles from './Home.less';

export default (props: any): React.ReactNode => (
  <div className={styles.page_content}>
    <div className={styles.page_aside}>
      <AsideAll props={props} />
    </div>
    <div className={styles.page_body}>
      {props.location.query.columnId && <ColumnDetail props={props} />}
      <ListAll props={props} />
    </div>
  </div>
);