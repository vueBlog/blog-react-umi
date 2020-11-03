declare namespace API {
  export interface CurrentUser {
    admin?: number;
    authorHeadimg?: string;
    authorIntroduce?: string;
    authority?: number;
    email?: string;
    id?: number;
    name?: string;
  }

  export interface CurrentUserRequest {
    data?: CurrentUser;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
