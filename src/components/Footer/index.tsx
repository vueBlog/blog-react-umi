import React from 'react';
import { footerLink, motto, author, record } from '../../../config/footerConfig';
import styles from './index.less';

export default () => (
  <div className={styles.footer_box}>
    {footerLink && (
      <div className={styles.footer_row}>
        <span className={styles.footer_row_title}>友情链接：</span>
        {footerLink.map((item) => (
          <a
            key={item.key}
            className={styles.footer_row_link}
            href={item.href}
            title={item.title}
            target={item.blankTarget ? '_blank' : '_self'}
          >
            {item.title}
          </a>
        ))}
      </div>
    )}
    {motto && (
      <div className={styles.footer_row}>
        <span className={styles.footer_row_title}>{author.name}：</span>
        {motto}
      </div>
    )}
    <div className={styles.footer_row}>
      <div className={styles.footer_row_item}>Powered by</div>
      <a
        className={styles.footer_row_link}
        href="https://github.com/vueBlog"
        title="vueBlog"
        target="_blank"
        rel="noreferrer"
      >
        vueBlog
      </a>
      <div className={styles.footer_row_item}>© 2019-2020</div>
      <a
        className={styles.footer_row_link}
        href={author.href}
        title={author.name}
        target="_blank"
        rel="noreferrer"
      >
        {author.name}
      </a>
      <a
        className={styles.footer_row_link}
        href={record.href}
        title={record.name}
        target="_blank"
        rel="noreferrer"
      >
        {record.name}
      </a>
    </div>
  </div>
);
