import React from 'react';
import { Link } from 'umi';

import { nextPrevAllInfoTs } from '@/services/detail';
import styles from './NextPrevArticle.less';

const NextPrevArticle: React.FC<nextPrevAllInfoTs> = ({ prevInfo, nextInfo }) => {
  return (
    <div className={styles.next_prev_box}>
      <Link className={styles.item} to={`/detail/${prevInfo.articleId}`}>
        上一篇：{prevInfo.articleTitle}
      </Link>
      <Link className={styles.item} to={`/detail/${nextInfo.articleId}`}>
        下一篇：{nextInfo.articleTitle}
      </Link>
    </div>
  );
};

export default NextPrevArticle;
