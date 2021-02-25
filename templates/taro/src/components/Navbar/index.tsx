import React from 'react';
import { AtIcon } from 'taro-ui';
import styles from './index.module.less';
import { View } from '@tarojs/components';
import useMenuPosition from '@/hooks/useMenuPosition';
import classnames from 'classnames';
import Taro from '@tarojs/taro';

interface NavBarProps {
  title?: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onLeftClick?: () => void;
  leftIcon?: string;
}
const NavBar: React.FC<NavBarProps> = props => {
  const rect = useMenuPosition();
  const className = classnames({
    [`${styles.navbar}`]: true,
    [`${props.className}`]: props.className
  });

  
  function handleBack() {
    if (props.onLeftClick) {
      return props.onLeftClick();
    }
    Taro.switchTab({
      url: '/pages/controller/index',
    });
  }
  return (
    <View className={className} style={{paddingTop: rect && rect.top, height: rect && rect.height, ...props.style}}>
      <View onClick={handleBack} className={styles.left}>
        <AtIcon value={props.leftIcon || 'home'}></AtIcon>
      </View>
      <View className={styles.center}>
        {props.title}
      </View>
      <View className={styles.right}></View>
    </View>
  )
}

export default NavBar;