import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUserRequest>('/api/vue-blog/tokenGetUserInfo', {
    method: 'post',
    data: {
      token: 'f2c3f0e3b81fe4d95d5902bc963262ea',
    },
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
