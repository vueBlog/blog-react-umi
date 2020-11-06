import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { message, Card } from 'antd';
import { Link } from 'umi';

import { getAsideData } from '@/services/aside';
import styles from './AsideAll.less';

const initAsideData: API.AsideItemData[] = [];
for (let index: number = 0; index < 4; index += 1) {
  initAsideData.push({
    title: '',
    type: index,
    info: [
      {
        id: index,
        num: index,
        title: '',
      },
    ],
  });
}

const AsideAll: React.FC<{
  className: string;
}> = ({ className }) => {
  const [asideData, setAsideData] = useState<API.AsideItemData[]>(initAsideData);
  const { loading, run } = useRequest(() => getAsideData(), {
    manual: true,
    onSuccess: (result) => {
      if (result.isok) {
        setAsideData(result.data.list);
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
    <div className={className}>
      {asideData.map((item) => (
        <Card
          key={item.type}
          title={item.title}
          loading={loading}
          style={{ width: 266, marginBottom: 24 }}
        >
          {item.info.map((itemInfo) => (
            <Link to="/list" key={itemInfo.id} className={styles.card_item}>
              <span className={styles.card_item_number}>{itemInfo.num} views</span>
              <div title={itemInfo.title} className={styles.card_item_title}>
                {itemInfo.title}
              </div>
            </Link>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default AsideAll;
