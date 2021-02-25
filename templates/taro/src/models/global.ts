import Taro from '@tarojs/taro';

export default {
  namespace: 'global',
  state: {
    accessToken: Taro.getStorageSync('access_token'),
    encryptedData: '',
    signature: '',
    iv: '',
    userInfo: {
    }
  },
  effectes: {},
  reducers: {
    userAction(state, {action, data}) {
      switch(action) {
        case 'save':
          return {
            ...state,
            userInfo: data
          }
        default: 
          return state;
      }
    },
    authAction(state, {action, data}) {
      switch(action) {
        case 'save':
          return {
            ...state,
            encryptedData: data.encryptedData,
            signature: data.signature,
            iv: data.iv
          }
        default:
          return state;
      }
    }
  },
  subscriptions: {}
}

