import { useLayoutEffect } from 'react';
import { handlelogin } from '@/utils/request';
import Taro from '@tarojs/taro';

/**
 * 登录和存储token
 * @param init 登录成功后的回调
 */
const useAuth = (init?: (...rest: any) => any) => {

  useLayoutEffect(() => {
    loginAndSaveToken()
    .then(init)
  }, [])

  /** 登录保存token*/
  async function loginAndSaveToken() {
    try {
      await Taro.checkSession();
    } catch (err) {
      const { code } = await Taro.login();
      if (code) {
        await handlelogin(code);
      }
    }
  }
}

export default useAuth;