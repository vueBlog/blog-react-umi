import React from 'react';
import ListAll from '@/components/List/ListAll';
import ColumnDetail from '@/components/Column/Column';
// import styles from './Home.less';

export default (props: any): React.ReactNode => (
  <>
    {props.location.query.columnId && <ColumnDetail />}
    <ListAll />
  </>
);
