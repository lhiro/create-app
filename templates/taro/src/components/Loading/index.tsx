import React from 'react';
import { AtActivityIndicator } from 'taro-ui';
import styles from './index.module.less';
import { View } from '@tarojs/components';
import classnames from 'classnames';

interface LoadingProps {
  visible?: boolean;
}


const Loading: React.FC<LoadingProps> = props => {
  const className = classnames({
    [`${styles.loading}`]: true,
    [`${styles.active}`]: props.visible
  })
  return (
    <View className={className}>
      <AtActivityIndicator />
    </View>
  )
}


export default Loading;