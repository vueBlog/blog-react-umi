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
  const { location } = props;
  const { query } = location;

  const [original, setOriginal] = useState(!!(query.original === 'true'));
  const [order, setOrder] = useState(query.order * 1 || 0);
  const [page, setPage] = useState(query.page * 1 || 1);
  const [count, setCount] = useState(query.count * 1 || 10);

  const [columnId] = useState<string>(query.columnId);
  const [dateTime] = useState<string>(query.dateTime);

  const [listData, setListData] = useState<API.ListItemData[]>([]);
  const [listDataTotal, setListDataTotal] = useState(0);
  const { loading, run } = useRequest(
    () => {
      document.documentElement.scrollTo(0, 0);

      const queryData = {
        justOriginal: original,
        order,
        count,
        page,
      };
      if (columnId) {
        Object.assign(queryData, { columnId });
      }
      if (dateTime) {
        Object.assign(queryData, { dateTime });
      }

      return getListData(queryData);
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
    const queryData = {
      original,
      order,
      // count,
      page,
    };
    if (columnId) {
      Object.assign(queryData, { columnId });
    }
    if (dateTime) {
      Object.assign(queryData, { dateTime });
    }

    history.push({
      pathname: location.pathname,
      query: queryData,
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
