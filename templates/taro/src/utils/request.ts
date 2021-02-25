import Taro from '@tarojs/taro';
import { login } from '@/services/api';
import dva from '@/utils/dva';

export interface CurlOption {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: {
    [key: string]: string;
  },
  raw?: boolean;
}

export interface IResult {
  code: number;
  data: any;
  msg: string;
}

export async function handlelogin(code: string) {
  const response = await login({
    code
  });
  if (response.header) {
    const token = response.header['Jwt-Token'] || response.header['jwt-token'];
    await Taro.setStorage({
      key: 'token',
      data: token,
    });
  }
}
async function curl(url: string, options: CurlOption = {}) {

  const dispatch = dva.getDispatch();
  try {
    const { raw, ...rest } = options;
    const token = await Taro.getStorageSync('token');
    const response = await Taro.request<IResult | any>({
      url: /^(http|https):\/\//.test(url) ? url : process.env.API_ROOT + url,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      ...rest
    });
    if (response.statusCode === 200) {
      if (response.data.code === 400) {
        const { msg } = response.data;
        switch(true) {
          case msg.includes('token解析失败'):
            const { code } = await Taro.login();
            if (code) {
              await handlelogin(code);
              return await curl(url, options)
            }
            break;
          case msg.includes('授权过期'):
            Taro.atMessage({
              message: msg,
              type: 'error'
            });
            dispatch({
              type: 'channels/saveSelectedId',
              id: 0
            });
            break;
          case msg.includes('无登录请求'):
            return;
          default:
            throw new Error(response.data.msg);
        }
      }
      if (raw) {
        return response;
      }
      return response.data;
    }
    throw new Error(JSON.stringify(response));
  } catch (err) {
    console.error(err);
    Taro.atMessage && Taro.atMessage({
      'message': process.env.NODE_ENV === 'development' ? err.message : '网络错误，请稍后重试',
      'type': 'error',
    });
    return ({
      code: err.status,
      data: null
    });
  }
}


export default curl;