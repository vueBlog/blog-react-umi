import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { message, Card } from 'antd';
import { history, Link, useLocation } from 'umi';

import { getAsideData } from '@/services/aside';
import styles from './AsideAll.less';

const AsideAll: React.FC<{
  className?: string;
}> = ({ className }) => {
  const location: any = useLocation();

  const initAsideData: API.AsideItemData[] = [];
  const [allAsideData, setAllAsideData] = useState<API.AsideItemData[]>([]);
  let asideDataLength = 0;
  if (location.pathname === '/home') {
    asideDataLength = 4;
  } else if (location.pathname === '/list') {
    asideDataLength = 2;
  }

  for (let index: number = 0; index < asideDataLength; index += 1) {
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

  const [asideData, setAsideData] = useState<API.AsideItemData[]>(initAsideData);
  const { loading, run } = useRequest(() => getAsideData(), {
    manual: true,
    onSuccess: (result) => {
      if (result.isok) {
        setAllAsideData(result.data.list);
        if (location.pathname === '/home') {
          setAsideData(result.data.list);
        } else if (location.pathname === '/list') {
          const data = result.data.list.filter((item) => [2, 4].includes(item.type));
          setAsideData(data);
        }
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

  useEffect(() => {
    const unlisten = history.listen((locationQuery: any) => {
      if (locationQuery.pathname === '/home') {
        setAsideData(allAsideData);
      } else if (locationQuery.pathname === '/list') {
        const data = allAsideData.filter((item) => [2, 4].includes(item.type));
        setAsideData(data);
      }
    });
    return () => unlisten();
  }, [allAsideData]);

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
            <Link
              to={
                [2, 4].includes(item.type)
                  ? `/list?${item.type === 2 ? 'columnId' : 'dateTime'}=${itemInfo.id}`
                  : '/detail'
              }
              key={itemInfo.id}
              className={styles.card_item}
            >
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
