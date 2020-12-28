/* eslint-disable no-console */
import { request } from 'umi';

export interface getDetailParamsTs {
  // 文章id
  articleId: number | string;
  // 更改文章view数
  changeView: number;
}

export interface authorInfoTs {
  authorId: number;
  authorName: string;
}

export interface detailInfoTs {
  articleAuthorId: number;
  articleColumn: number;
  articleContentHtml: string;
  articleContentMarkdown: string;
  articleCreateTime: string;
  articleId: number;
  articleKey: string;
  articleNature: number;
  articleStart: number;
  articleSubTitle: string;
  articleTitle: string;
  articleUpdateTime: string;
  articleView: number;
}

export interface nextPrevInfoTs {
  articleId: number;
  articleTitle: string;
}

export interface nextPrevAllInfoTs {
  nextInfo: nextPrevInfoTs;
  prevInfo: nextPrevInfoTs;
}

export interface detailInfoDataTs {
  authorInfo: authorInfoTs;
  info: detailInfoTs;
  nextInfo: nextPrevInfoTs;
  prevInfo: nextPrevInfoTs;
}

export interface detailRequest {
  data: detailInfoDataTs;
  isok?: boolean;
  msg?: string;
}

export async function getDetail(data: getDetailParamsTs): Promise<detailInfoDataTs> {
  return new Promise((resolve: any, reject: any) => {
    request<detailRequest>('/article/detail', {
      method: 'get',
      params: data,
    })
      .then((res) => {
        if (res.isok) {
          resolve(res.data);
        } else {
          console.log(res.msg);
          reject(new Error(res.msg));
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
