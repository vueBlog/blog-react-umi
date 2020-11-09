import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { message, Divider, Skeleton } from 'antd';
import { getColumnData } from '@/services/column';

import styles from './Column.less';

const ColumnDetail: React.FC<{
  props: any;
  className?: string;
}> = ({ props }) => {
  const [columnData, setColumnData] = useState({
    columnContent: '',
    columnId: 0,
    columnNumber: 0,
    columnTitle: '',
    time: '',
  });

  const [columnId] = useState(props.location.query.columnId);

  const { loading, run } = useRequest(() => getColumnData(columnId), {
    manual: true,
    onSuccess: (result) => {
      if (result.isok) {
        setColumnData(result.data);
      } else {
        message.error(result.msg);
      }
    },
    onError: (err) => {
      message.error(err);
    },
  });

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <div className={styles.column_body}>
        <Skeleton loading={loading} title={false} active>
          <div className={styles.column_row}>
            <span>专栏名称：</span>
            <span>{columnData.columnTitle}</span>
          </div>
          <div className={styles.column_row}>
            <span>专栏介绍：</span>
            <span>{columnData.columnContent}</span>
          </div>
          <div className={styles.column_row}>
            <span>文章总数：</span>
            <span>{columnData.columnNumber}</span>
          </div>
        </Skeleton>
      </div>
      <Divider />
    </>
  );
};

export default ColumnDetail;
