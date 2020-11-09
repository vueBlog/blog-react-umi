import { request } from 'umi';

export interface LoginParamsType {
  email: string;
  password: string;
  name: string;
  type: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  const requestUrl: string = params.type === 'signIn' ? '/signIn' : '/addUser';
  return request<API.LoginStateType>(requestUrl, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
