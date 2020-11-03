import React, { useState, useEffect } from 'react';
import ListTool from '@/components/List/ListTool';
import { history } from 'umi';
// import { useRequest } from 'ahooks';
// import styles from './Home.less';

export default (props: any): React.ReactNode => {
  const [original, setOriginal] = useState(!!(props.location.query.original === 'true'));
  const [order, setOrder] = useState(props.location.query.order * 1 || 0);
  // const []

  useEffect(() => {
    history.push({
      pathname: '/home',
      query: {
        original,
        order,
      },
    });
  }, [original, order]);

  return (
    <ListTool
      original={original}
      originalChange={setOriginal}
      order={order}
      orderChange={setOrder}
      {...props}
    />
  );
};
