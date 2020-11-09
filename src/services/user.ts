import { request } from 'umi';
import Cookies from 'js-cookie';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUserRequest>('/tokenGetUserInfo', {
    method: 'post',
    data: {
      token: Cookies.get('vueBlogToken'),
    },
  });
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
