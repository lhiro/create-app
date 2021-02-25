import React from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.less';

interface NotLoginMaskProps {
  visible?: any;
  title?: string;
}

const NotLoginMask: React.FC<NotLoginMaskProps> = props => {
  const notLoginMaskClass = classnames({
    [`${styles.notLoginMask}`]: true,
    [`${styles.active}`]: props.visible
  });

  function handleMaskClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    Taro.showToast({
      title: props.title || '请先登录哦',
      icon: 'none',
      duration: 3000
    });
  }

  return (
    <View onClick={handleMaskClick} className={notLoginMaskClass}></View>
  )
}

export default NotLoginMask;