import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { Divider, message } from 'antd';

import ListTool from '@/components/List/ListTool';
import ListShow from '@/components/List/ListShow';
import { getListData } from '@/services/list';

const ListAll: React.FC<{
  props: any;
  className?: string;
}> = ({ props, className }) => {
  const [original, setOriginal] = useState(!!(props.location.query.original === 'true'));
  const [order, setOrder] = useState(props.location.query.order * 1 || 0);
  const [page, setPage] = useState(props.location.query.page * 1 || 1);
  const [count, setCount] = useState(props.location.query.count * 1 || 10);

  const [columnId] = useState<string>(props.location.query.columnId);
  const [dateTime] = useState<string>(props.location.query.dateTime);

  const [listData, setListData] = useState<API.ListItemData[]>([]);
  const [listDataTotal, setListDataTotal] = useState(0);
  const { loading, run } = useRequest(
    () => {
      document.documentElement.scrollTo(0, 0);

      const query = {
        justOriginal: original,
        order,
        count,
        page,
      };
      if (columnId) {
        Object.assign(query, { columnId });
      }
      if (dateTime) {
        Object.assign(query, { dateTime });
      }

      return getListData(query);
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
    const query = {
      original,
      order,
      // count,
      page,
    };
    if (columnId) {
      Object.assign(query, { columnId });
    }
    if (dateTime) {
      Object.assign(query, { dateTime });
    }

    history.push({
      pathname: '/home',
      query,
    });
    run();
  }, [original, order, count, page, columnId]);

  return (
    <div className={className}>
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
    </div>
  );
};

export default ListAll;
