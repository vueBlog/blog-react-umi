/* eslint-disable react/no-danger */
/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Clipboard from 'clipboard';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/vs2015.css';

import { PageHeader, Tag, Divider, message, Spin } from 'antd';
import { Link, history } from 'umi';

import { getDetail, detailInfoDataTs, detailInfoTs } from '@/services/detail';
import NextPrevArticle from '@/components/Detail/NextPrevArticle';
import styles from './Detail.less';

const PageHeaderTitle: React.FC<detailInfoTs> = (info) => {
  return (
    <div className={styles.page_header_title}>
      <Tag color="blue">{['原创', '转载', '翻译'][info.articleNature]}</Tag>
      <span className={classNames('ellipsis')} title={info.articleTitle}>
        {info.articleTitle}
      </span>
    </div>
  );
};

let unlisten: any;

class DetailShow extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      authorInfo: {},
      info: {},
      nextInfo: {},
      prevInfo: {},
      tocFixed: false,
      loading: false,
    };
    this.getDetailInfo = this.getDetailInfo.bind(this);
    this.pageScroll = this.pageScroll.bind(this);
  }

  componentDidMount() {
    this.getDetailInfo(this.props?.match?.params?.id);
    window.addEventListener('scroll', this.pageScroll, false);

    const clipboard = new Clipboard('.copy-btn');
    clipboard.on('success', () => {
      message.success('复制成功');
    });
    clipboard.on('error', () => {
      message.error('复制失败');
    });

    unlisten = history.listen((location: any) => {
      const regexp = pathToRegexp('/detail/:id');
      const locationRegexpResult = regexp.exec(location.pathname);
      const articleId = locationRegexpResult && locationRegexpResult[1];
      if (articleId) {
        this.getDetailInfo(articleId);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.pageScroll, false);

    unlisten();
  }

  getDetailInfo(articleId: string): void {
    document.documentElement.scrollTo(0, 0);
    this.setState({ loading: true });
    getDetail({
      articleId,
      changeView: 1,
    })
      .then((res: detailInfoDataTs): void => {
        this.setState({ authorInfo: res.authorInfo });
        this.setState({ info: res.info });
        this.setState({ nextInfo: res.nextInfo });
        this.setState({ prevInfo: res.prevInfo });
        hljs.registerLanguage('javascript', javascript);
        setTimeout(() => {
          if (this.props?.location?.hash) {
            let hash = decodeURI(this.props?.location?.hash);
            hash = hash.replace(/`/g, '').replace(/\./g, '').replace(/\(\)/g, '').toLowerCase();
            document.querySelector(hash)?.scrollIntoView({ block: 'center', inline: 'center' });
          }
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getTime(info: detailInfoTs): string {
    // eslint-disable-next-line no-nested-ternary
    return info.articleUpdateTime
      ? moment(info.articleUpdateTime).format('YYYY-MM-DD HH:mm:ss')
      : info.articleCreateTime
      ? moment(info.articleCreateTime).format('YYYY-MM-DD HH:mm:ss')
      : '';
  }

  pageScroll() {
    if (document.querySelector('.markdownIt-TOC')) {
      const pageScrollTop = document.documentElement.scrollTop;
      if (pageScrollTop && pageScrollTop >= 200) {
        this.setState({ tocFixed: true });
      } else {
        this.setState({ tocFixed: false });
      }
    }
  }

  render() {
    const { authorInfo, info, nextInfo, prevInfo, tocFixed, loading } = this.state;
    return (
      <div className={classNames('detail-body')}>
        <Spin spinning={loading}>
          <div className={styles.detail_header}>
            <PageHeader
              className={styles.detail_page_header}
              onBack={() => history.go(-1)}
              title={PageHeaderTitle(info)}
            />
            <div className={styles.detail_info}>
              <span>{this.getTime(info)}</span>
              <Divider type="vertical" style={{ height: '22px' }} />
              <Link to={`/about/${authorInfo.authorId}`}>{authorInfo.authorName}</Link>
              <Divider type="vertical" style={{ height: '22px' }} />
              <span>views：{info.articleView}</span>
            </div>
            <NextPrevArticle prevInfo={prevInfo} nextInfo={nextInfo} />
          </div>
          <div className={styles.detail_content_box}>
            <div
              className={classNames(styles.detail_content, 'article-content', 'markdown-body', {
                'fixed-toc-box': tocFixed,
              })}
              dangerouslySetInnerHTML={{ __html: info.articleContentHtml }}
            />
          </div>
          <div className={styles.detail_footer}>
            <NextPrevArticle prevInfo={prevInfo} nextInfo={nextInfo} />
          </div>
        </Spin>
      </div>
    );
  }
}

export default DetailShow;
