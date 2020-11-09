import { Alert, message } from 'antd';
import React, { useState } from 'react';
import {
  Link,
  // SelectLang,
  useModel,
  history,
  History,
} from 'umi';
import logo from '@/assets/logo.jpg';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import Footer from '@/components/Footer';
import md5 from 'blueimp-md5';
import Cookies from 'js-cookie';
import defaultSettings from '../../../../config/defaultSettings';
import { motto } from '../../../../config/footerConfig';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, Email, Password, Username, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('signIn');
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const res = await fakeAccountLogin({ ...values, password: md5(values.password), type });
      if (res.isok && initialState) {
        if (type === 'signIn') {
          const successMsg: string = '登录成功！';
          Cookies.set('vueBlogToken', res.data.token, { expires: 7, path: '' });
          message.success(successMsg);
          const currentUser = await initialState?.fetchUserInfo();
          setInitialState({
            ...initialState,
            currentUser,
          });
          replaceGoto();
          return;
        }
        if (res.data.admin) {
          const successMsg: string = '注册成功，现在去写文章！';
          Cookies.set('vueBlogToken', res.data.token, { expires: 7, path: '' });
          message.success(successMsg);
          const currentUser = await initialState?.fetchUserInfo();
          setInitialState({
            ...initialState,
            currentUser,
          });
          replaceGoto();
          return;
        }
        const successMsg: string = '注册成功，等待管理员同意！';
        message.success(successMsg);
        history.replace('/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(res);
    } catch (error) {
      const errorMsg: string = type === 'signIn' ? '登录失败，请重试！' : '注册失败，请重试！';
      message.error(errorMsg);
    }
    setSubmitting(false);
  };

  const { isok: status, msg: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{/* <SelectLang /> */}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>{defaultSettings.title}</span>
            </Link>
          </div>
          {motto && <div className={styles.desc}>{motto}</div>}
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="signIn" tab="登录">
              {!status && loginType === 'signIn' && !submitting && (
                <LoginMessage content="邮箱或密码错误" />
              )}

              <Email
                name="email"
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱！',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </Tab>
            <Tab key="register" tab="注册">
              <Username
                name="name"
                placeholder="请输入用户名称"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名称!',
                  },
                ]}
              />
              <Email
                name="email"
                placeholder="请输入邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                  {
                    type: 'email',
                    message: '请输入正确的邮箱！',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </Tab>
            <Submit loading={submitting}>登录</Submit>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
