import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { Divider } from 'antd';

import ListTool from '@/components/List/ListTool';
import ListShow from '@/components/List/ListShow';
import { getListData } from '@/services/list';
// import styles from './Home.less';

export default (props: any): React.ReactNode => {
  const [original, setOriginal] = useState(!!(props.location.query.original === 'true'));
  const [order, setOrder] = useState(props.location.query.order * 1 || 0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(props.location.query.page * 1 || 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(props.location.query.count * 1 || 10);

  const [listData, setListData] = useState<API.ListItemData[]>([]);
  const { loading, run } = useRequest(
    () =>
      getListData({
        justOriginal: original,
        order,
        count,
        page,
      }),
    {
      manual: true,
      onSuccess: (result) => {
        if (result.isok) {
          setListData(result.data.list);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    history.push({
      pathname: '/home',
      query: {
        original,
        order,
      },
    });
    run();
  }, [original, order, count, page]);

  return (
    <>
      <ListTool
        original={original}
        originalChange={setOriginal}
        order={order}
        orderChange={setOrder}
        {...props}
      />
      <Divider />
      <ListShow loading={loading} listData={listData} count={count} />
    </>
  );
};
