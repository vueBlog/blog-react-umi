import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { message, Card } from 'antd';

import { getAsideData } from '@/services/aside';

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
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      ))}
    </div>
  );
};

export default AsideAll;
