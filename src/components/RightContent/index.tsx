import {
  // Tooltip,
  Tag,
  Space,
  Button,
} from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import {
  useModel,
  Link,
  // SelectLang
} from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="请输入搜索内容"
        defaultValue=""
        options={[]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      {/* <Tooltip title="使用文档">
        <span
          className={styles.action}
          onClick={() => {
            window.location.href = 'https://pro.ant.design/docs/getting-started';
          }}
        >
          <QuestionCircleOutlined />
        </span>
      </Tooltip> */}
      {initialState.currentUser ? (
        <Avatar />
      ) : (
        <Button type="link">
          <Link to="/user/login" replace>
            登录
          </Link>
        </Button>
      )}
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
