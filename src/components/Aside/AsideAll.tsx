import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';

import { getAsideData } from '@/services/aside';
import AsideItem from './AsideItem';

const AsideAll: React.FC<{
  className: string;
}> = ({ className }) => {
  const [asideData, setAsideData] = useState<API.AsideItemData[]>([]);
  const { loading, run } = useRequest(() => getAsideData(), {
    manual: true,
    onSuccess: (result) => {
      if (result.isok) {
        setAsideData(result.data);
        console.log(loading);
        console.log(asideData);
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
      <AsideItem />
    </div>
  );
};

export default AsideAll;
