import { request } from 'umi';

export async function getColumnData(id: string) {
  return request<API.ColumnDataRequest>('/column/detail', {
    method: 'get',
    params: {
      id,
    },
  });
}
