import { request } from 'umi';

export async function getAsideData() {
  return request<API.AsideDataRequest>('/aside', {
    method: 'get',
  });
}
