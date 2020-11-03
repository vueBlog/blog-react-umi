import React from 'react';
import { List, Skeleton } from 'antd';
// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import styles from './ListShow.less';

const ListShow: React.FC<{
  loading: boolean;
  listData: API.ListItemData[];
  count: number;
}> = ({ loading, listData, count }) => {
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
        onChange: (page) => {
          console.log(page);
        },
        pageSize: count,
      }}
      dataSource={currentListData}
      renderItem={(item) =>
        loading ? (
          <List.Item
            className={styles.list_item}
            key={item.articleId}
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
          >
            <Skeleton title={false} loading={loading} active>
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
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
          >
            <List.Item.Meta title={<a>{item.articleTitle}</a>} description={item.articleSubTitle} />
          </List.Item>
        )
      }
    />
  );
};

export default ListShow;
