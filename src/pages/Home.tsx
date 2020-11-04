import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { Divider, message } from 'antd';

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
  const [listDataTotal, setListDataTotal] = useState(0);
  const { loading, run } = useRequest(
    () => {
      document.documentElement.scrollTo(0, 0);
      return getListData({
        justOriginal: original,
        order,
        count,
        page,
      });
    },
    {
      manual: true,
      onSuccess: (result) => {
        if (result.isok) {
          setListData(result.data.list);
          setListDataTotal(result.data.total);
        } else {
          message.error(result.msg);
        }
      },
      onError: (err) => {
        message.error(err);
      },
    },
  );

  useEffect(() => {
    history.push({
      pathname: '/home',
      query: {
        original,
        order,
        count,
        page,
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
        pageChange={setPage}
        {...props}
      />
      <Divider />
      <ListShow
        loading={loading}
        listData={listData}
        total={listDataTotal}
        page={page}
        pageChange={setPage}
        count={count}
        countChange={setCount}
      />
    </>
  );
};
