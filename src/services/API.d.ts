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
    isok?: boolean;
    msg?: string;
  }

  export interface LoginStateType {
    data?: {
      token?: string;
      admin?: boolean;
    };
    isok?: boolean;
    msg?: string;
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

  export interface ListItemData {
    articleAuthorId: number;
    articleCreateTime: string;
    articleId: number;
    articleNature: number;
    articleStart: number;
    articleSubTitle: string;
    articleTitle: string;
    articleView: number;
  }

  export interface ListDataRequest {
    data: {
      list: Array<ListItemData>;
      total: number;
    };
    isok?: boolean;
    msg?: string;
  }

  export interface AsideItemData {
    title: string;
    type: number;
    info: Array<{
      id: number;
      num: number;
      title: string;
    }>;
  }

  export interface AsideDataRequest {
    data: {
      list: Array<AsideItemData>;
    };
    isok?: boolean;
    msg?: string;
  }

  export interface ColumnDataRequest {
    data: {
      columnContent: string;
      columnId: number;
      columnNumber: number;
      columnTitle: string;
      time: string;
    };
    isok?: boolean;
    msg?: string;
  }
}
