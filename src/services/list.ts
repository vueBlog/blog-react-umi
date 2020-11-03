import { request } from 'umi';

export async function getListData(data: {
  count?: number;
  page?: number;
  justOriginal?: boolean;
  order?: number;
}) {
  return request<API.ListDataRequest>('/articleList', {
    method: 'get',
    params: data,
  });
}
