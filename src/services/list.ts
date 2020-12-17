import { request } from 'umi';

export interface getListDataParamsTs {
  // 每页数据条数
  count?: number;
  // 第几页
  page?: number;
  // 近看原创
  justOriginal?: boolean;
  // 文章排序
  order?: number;
  // 博客专栏id
  columnId?: number | string;
  // 博客归档月份
  dateTime?: string;
}

export async function getListData(data: getListDataParamsTs) {
  return request<API.ListDataRequest>('/articleList', {
    method: 'get',
    params: data,
  });
}
