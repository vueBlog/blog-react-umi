import React from 'react';
import * as moment from 'moment';
import { List, Skeleton, Space, Tag } from 'antd';
import { HighlightOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';

import styles from './ListShow.less';

interface IconTextTS {
  icon: any;
  text: string | number;
  title?: string;
}
const IconText: React.FC<IconTextTS> = ({ icon, text, title }) => (
  <div title={title && `${title}: ${text}`}>
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  </div>
);

interface ListShowTS {
  loading: boolean;
  listData: API.ListItemData[];
  total: number;
  page: number;
  pageChange: (value: number) => void;
  count: number;
  countChange?: (value: number) => void;
}
const ListShow: React.FC<ListShowTS> = ({ loading, listData, total, page, pageChange, count }) => {
  let currentListData;
  if (loading) {
    currentListData = [...Array(count).keys()].map((item, index) => {
      return {
        articleAuthorId: index,
        articleCreateTime: String(index),
        articleId: index,
        articleNature: index,
        articleStart: index,
        articleSubTitle: String(index),
        articleTitle: String(index),
        articleView: index,
      };
    });
  } else {
    currentListData = listData;
  }
  return (
    <List
      className={styles.list_show}
      itemLayout="vertical"
      size="large"
      pagination={{
        total,
        current: page,
        pageSize: count,
        showSizeChanger: false,
        onChange: (current) => {
          pageChange(current);
        },
        // onShowSizeChange: (current, pageSize) => {
        //   pageChange(current);
        //   countChange(pageSize);
        // },
      }}
      dataSource={currentListData}
      renderItem={(item) =>
        loading ? (
          <List.Item className={styles.list_item} key={item.articleId}>
            <Skeleton loading={loading} active>
              <List.Item.Meta
                title={<a>{item.articleTitle}</a>}
                description={item.articleSubTitle}
              />
            </Skeleton>
          </List.Item>
        ) : (
          <List.Item
            className={styles.list_item}
            key={item.articleId}
            actions={[
              <IconText
                icon={HighlightOutlined}
                text={moment(item.articleCreateTime).format('YYYY-MM-DD HH:mm:ss')}
                title="发布时间"
                key="list-vertical-eye-o"
              />,
              <IconText
                icon={EyeOutlined}
                text={item.articleView}
                title="浏览数"
                key="list-vertical-eye-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.articleStart}
                title="点赞数"
                key="list-vertical-like-o"
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <a>
                  <Tag color="blue">{['原创', '转载', '翻译'][item.articleNature]}</Tag>
                  {item.articleTitle}
                </a>
              }
              description={item.articleSubTitle}
            />
          </List.Item>
        )
      }
    />
  );
};

export default ListShow;
