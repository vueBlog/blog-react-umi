import React from 'react';
import { Checkbox, Select } from 'antd';
import styles from './ListTool.less';

const { Option } = Select;

interface ListToolTS {
  original: boolean;
  originalChange: (e: boolean) => void;
  order: number;
  orderChange: (value: number) => void;
  pageChange: (value: number) => void;
}

const ListTool: React.FC<ListToolTS> = ({
  original,
  originalChange,
  order,
  orderChange,
  pageChange,
}) => (
  <div className={styles.list_tool}>
    <div className={styles.tool_left}>
      <Checkbox
        checked={original}
        onChange={(e) => {
          originalChange(e.target.checked);
          pageChange(1);
        }}
      >
        仅看原创
      </Checkbox>
    </div>
    <div className={styles.tool_right}>
      <span className={styles.tool_right_title}>文章排序：</span>
      <Select
        value={order}
        onChange={(value) => {
          orderChange(value);
          pageChange(1);
        }}
        style={{ width: 180 }}
      >
        <Option value={0}>默认</Option>
        <Option value={1}>按访问量</Option>
        <Option value={2}>按点赞数</Option>
      </Select>
    </div>
  </div>
);

export default ListTool;
